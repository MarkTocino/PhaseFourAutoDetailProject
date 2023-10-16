from app import app, bcrypt
from models import db, User, Car, Appointment

if __name__ == '__main__':
    with app.app_context():
        print("Clearing db...")
        User.query.delete()
        Car.query.delete()
        Appointment.query.delete()

        print("Seeding users...")
        hashed_password_sam = bcrypt.hashpw('YoungKing'.encode('utf-8'),bcrypt.gensalt())
        hashed_password_mark = bcrypt.hashpw('King'.encode('utf-8'),bcrypt.gensalt())


        sam = User(first_name="Sam", last_name="Ou", phone_number=7187363560, email="Sam@hotmail.com", password=hashed_password_sam)
        mark = User(first_name="Mark", last_name="Tocino", phone_number=5163002931, email="Mark@gmail.com", password=hashed_password_mark)
        users=[sam,mark]
        db.session.add_all(users)
        db.session.commit()
        
        print("Seeding cars...")
        accord = Car(make='Honda', model='Accord', year=2022, engine='252-hp turbocharged 2.0-liter four-cylinder',plate_number = 'TNGM07', user_id =mark.id)
        forester = Car(make='Subaru', model='Forester', year=2022, engine='182-hp 2.5-liter flat-four-cylinder',plate_number = 'SAMOUT1', user_id = sam.id)
        cars=[accord,forester]
        db.session.add_all(cars)
        db.session.commit()

        print("Seeding appointments...")
        
        markacc = Appointment(date='10/10/2023', time=55, type_of_service='Wheel Alignment', user_id=mark.id, car_id =accord.id)
        samfor = Appointment(date='12/9/2023', time=60, type_of_service='Oil Change', user_id=sam.id, car_id = forester.id)
        appts =[markacc, samfor]
        db.session.add_all(appts)
        
        db.session.commit()

        print("Done seeding!")

#pipenv install & pipenv shell
