from models import db, User, Car, Appointment
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask import Flask, make_response, jsonify, request, render_template, redirect, session
from flask_cors import CORS as FlaskCors
from flask_session import Session
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.config["SESSION_COOKIE_SECURE"] = True
app.config["SESSION_COOKIE_SAMESITE"] = "None"
app.config["SESSION_COOKIE_PATH"] = "/"


Session(app)
cors = FlaskCors(app, origins=["http://localhost:3000"], supports_credentials=True)

migrate = Migrate(app, db)

db.init_app(app)
api=Api(app)

@app.route('/')
def home():
    return 'HELLO WORLD'

class Users(Resource):
    def get(self):
        users = User.query.all()
        users_ser = [user.to_dict() for user in users]
        return make_response(users_ser, 200)
api.add_resource(Users,'/users')

class Cars(Resource):
    def get(self):
        cars = Car.query.all()
        cars_ser =[car.to_dict() for car in cars]
        return make_response(cars_ser, 200)
api.add_resource(Cars, '/cars')

class Register(Resource):
    def post(self):
        data = request.get_json()
        user = User()
        try:
            for attr in data:
                setattr(user, attr, data[attr])
            db.session.add(user)
            db.session.commit()
            return make_response(user.to_dict(), 200)
        except ValueError as error:
            new_error = make_response({'error': str(error)}, 200)
            return new_error
api.add_resource(Register, '/register')

class Login(Resource):
    def post(self):
        data = request.get_json()
        email = data["email"]
        password = data["password"]

        user = User.query.filter(User.email == email).first()
        if not user:
            return make_response({'error':'No user found with email'}, 401)
        if user.password != password:
            return make_response({"error":"Invalid email or password"})
        if user.password == password and user.email == email:
            session['user_id'] = user.id,
            session['user_name'] = user.first_name
            return make_response({
                "id":user.id,
                "email":user.email,
                "name": user.first_name
            },200)
        
api.add_resource(Login, '/login')
class Appointments(Resource):
    def post(self):
        data = request.get_json()
        new_appt = Appointment(
            date = data['date'],
            time = data['time'],
            payment = data['payment'],
            type_of_service=data['type_of_service'],
            
        )
    # date = db.Column(db.String)
    # time = db.Column(db.Integer)
    # payment = db.Column(db.Integer)
    # type_of_service = db.Column(db.String)
    # user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    # car_id = db.Column(db.Integer, db.ForeignKey('cars.id'))
api.add_resource(Appointments, '/appointments')

class GetCurrent(Resource):
    def get(self):
        user_id = session.get('user_id')
        if not user_id:
            return make_response({'error': "User not authenticated"}, 400)
        
        user = User.query.get(user_id)
        if not user:
            return make_response({'errors':'User not found'}, 400)
        
        user_dict = user.to_dict()
        return make_response(user_dict, 200)
api.add_resource(GetCurrent, '/users/current')

class Signup(Resource):
    def post(self):
        user = User()
        data = request.get_json()
        for attr in data:
            setattr(user, attr, data[attr])
        db.session.add(user)
        db.session.commit()
        return make_response(user.to_dict(), 200)
api.add_resource(Signup, '/signup')
# LOGOUT OPTIONAL
class Logout(Resource):
    
    def delete(self):
        
        if session.get('user_id'):
            
            session['user_id'] = None
            
            return {}, 204
        
        return {'error': '401 Unauthorized'}, 401
api.add_resource(Logout, '/logout')

class MakeAppointmentLoggedIn(Resource):
    def post(self):
        user_id = session.get('user_id')
        data = request.get_json()
        userID = int(''.join(map(str, user_id)))
        appointments = Appointment()
        car = Car.query.filter(Car.plate_number == data['plate_number']).one_or_none()
        if not car:
            newcar = Car()
            for attr in data:
                setattr(newcar, attr, data[attr])
            setattr(newcar, 'user_id', userID)
            db.session.add(newcar)
            db.session.commit()
        carss = Car.query.filter(Car.plate_number == data['plate_number']).one_or_none()
        for attr in data:
            setattr(appointments, attr, data[attr])
        setattr(appointments, 'user_id', userID)
        setattr(appointments, 'car_id', carss.id)
        db.session.add(appointments)
        db.session.commit()
        return make_response(appointments.to_dict(), 200 )
api.add_resource(MakeAppointmentLoggedIn, '/LoggedInAppointments')


if __name__ == "__main__":
    app.run(port=5555, debug = True )
