from models import db, User, Car, Appointment
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask import Flask, make_response, jsonify, request, session
from flask_cors import CORS as FlaskCors
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
import os
import bcrypt

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.json.compact = False
# app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.config["SESSION_COOKIE_SECURE"] = True
app.config["SESSION_COOKIE_SAMESITE"] = "None"
app.config['SECRET_KEY'] = 'c24bb3864c2d48f9883f5fb9'
migrate = Migrate(app, db)
db.init_app(app)
api=Api(app)


cors = FlaskCors(app, origins=["http://localhost:3000"], supports_credentials=True)


# Login Things :)
login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


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

# Register
class Register(Resource):
    def post(self):
        data = request.get_json()
        password = data['password']
        first_name = data['first_name']
        last_name=data['last_name']
        email = data['email']
        phone_number=data['phone_number']
        hashed=bcrypt.hashpw(password.encode('utf-8'),bcrypt.gensalt())
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return make_response("Email is already in use"), 400
        try:
            user = User( email=email,password=hashed, first_name=first_name, last_name=last_name, phone_number=phone_number)
            db.session.add(user)
            db.session.commit()
            return make_response("User has been created", 200)
        except:
            return make_response("Failed to Create User"), 404
api.add_resource(Register, '/register')


class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter(User.email == data['email']).first()
        if not user:
           return make_response({"error":"Not Found"}, 404)           
        password = data['password'].encode('utf-8')
        hashed_password = user.password.encode('utf-8')

        if bcrypt.checkpw(password, hashed_password):  
            login_user(user, remember=True)
            return "Logged in", 200
        else:
            return make_response("Wrong Password", 400)
api.add_resource(Login, '/login')

class Appointments(Resource):
    def get(self):
        appts = Appointment.query.all()
        appts_ser =[a.to_dict() for a in appts]
        return make_response(appts_ser, 200) 

api.add_resource(Appointments, '/appointments')

class GetCurrent(Resource):
    @login_required
    def get(self):
        user = current_user
        if user:
            return make_response(user.to_dict(), 200)
        else:
            return make_response({"message": "User not found"}, 404)
    def patch(self):
        user = User.query.get(current_user)
        data = request.get_json()
        for attr in data:
            setattr(user, attr, data[attr])
        db.session.add(user)
        db.session.commit()
        return make_response(user.to_dict(), 200)
api.add_resource(GetCurrent, '/users/current')

# LOGOUT OPTIONAL
class Logout(Resource):
    @login_required
    def delete(self):        
        if current_user:            
            logout_user()           
            return "Succesful Logout"      
        return {'error': '401 Unauthorized'}, 401
api.add_resource(Logout, '/logout')

class MakeAppointment(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter(User.email == data['email']).first()
        if not user:
            user = User()
            user.first_name = data['first_name']
            user.last_name = data['last_name']
            user.email = data["email"]
            user.phone_number = data['phone_number']
            db.session.add(user)
            db.session.commit()

        car = Car.query.filter(Car.plate_number == data['plate_number']).one_or_none()
        if not car:
            car = Car()
            for attr in data:
                setattr(car, attr, data[attr])
            setattr(car, 'user_id', car.id)
            db.session.add(car)
            db.session.commit()

        appointment = Appointment()
        for attr in data:
            setattr(appointment, attr, data[attr])
        
        setattr(appointment, 'user_id', user.id)
        setattr(appointment, 'car_id', car.id)
        db.session.add(appointment)
        db.session.commit()

        return make_response(appointment.to_dict(), 200)

api.add_resource(MakeAppointment, '/MakeAppointment')


if __name__ == "__main__":
    app.run(port=5555, debug = True )