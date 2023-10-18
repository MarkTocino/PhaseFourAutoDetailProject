from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import UserMixin
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'

db = SQLAlchemy(app)
migrate = Migrate(app, db)

class User(db.Model, SerializerMixin, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    phone_number = db.Column(db.String, unique = True)
    email = db.Column(db.String, unique = True)
    password = db.Column(db.String)
    appointments = db.relationship('Appointment', cascade = 'all,delete',backref = 'user')
    serialize_rules=('-appointments.user',)


class Car(db.Model, SerializerMixin):
    __tablename__ = 'cars'

    id = db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String)
    model = db.Column(db.String)
    year = db.Column(db.String)
    engine = db.Column(db.String)
    plate_number = db.Column(db.String, unique = True)
    appointments = db.relationship('Appointment',cascade = 'all,delete',backref='car')
    serialize_rules=('-appointments.car',)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))


class Appointment(db.Model, SerializerMixin):
    __tablename__ = 'appointments'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String)
    time = db.Column(db.String)
    type_of_service = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    car_id = db.Column(db.Integer, db.ForeignKey('cars.id'))
    serialize_rules = ('-car.appointments', '-user.appointments',)

class MarketCar(db.Model, SerializerMixin):
    __tablename__ = 'marketcars'

    id = db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String)
    model = db.Column(db.String)
    year = db.Column(db.String)
    miles = db.Column(db.String)
    condition = db.Column(db.String)
    price = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
class Offer(db.Model, SerializerMixin):
    __tablename__ = 'offers'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String)
    time = db.Column(db.String)
    type_of_service = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    marketcar_id = db.Column(db.Integer, db.ForeignKey('marketcars.id'))
