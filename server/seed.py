from app import app, bcrypt
from models import db, User, Car, Appointment, Offer, MarketCar

if __name__ == '__main__':
    with app.app_context():
        print("Clearing db...")
        User.query.delete()
        Car.query.delete()
        Appointment.query.delete()
        MarketCar.query.delete()
        Offer.query.delete()

        print("Seeding users...")
        hashed_password_sam = bcrypt.hashpw('YoungKing'.encode('utf-8'),bcrypt.gensalt())
        hashed_password_mark = bcrypt.hashpw('King'.encode('utf-8'),bcrypt.gensalt())
        sam = User(first_name="Sam", last_name="Ou", phone_number="812-5612-4511", email="Sam@gmail.com", password=hashed_password_sam)
        mark = User(first_name="Mark", last_name="Tocino", phone_number="455-300-8842", email="Mark@gmail.com", password=hashed_password_mark)
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
        markacc = Appointment(date='10/10/2023', time="12:00 PM", type_of_service='Wheel Alignment', user_id=mark.id, car_id =accord.id)
        samfor = Appointment(date='12/9/2023', time="3:00 PM", type_of_service='Oil Change', user_id=sam.id, car_id = forester.id)
        appts =[markacc, samfor]
        db.session.add_all(appts)
        db.session.commit()

        print("Seeding market cars...")
        marketcar1 = MarketCar(price=31000, image="/images/accord.jpg", make="Honda", model="Accord", year=2022, miles=6335, condition="Modified, slightly used", code="G3M1KF")
        marketcar2 = MarketCar(price=29000, image="/images/subie.jpg", make="Subaru", model="Forester", year=2022, miles=8325, condition="Mint", code="8W5C7D")
        marketcar3 = MarketCar(price=19000, image="/images/carshop.jpg", make="Honda", model="S2000", year=2009, miles=105024, condition="Restored", code="B4H8ZP")
        marketcar4 = MarketCar(price=71000, image="/images/m4comp.jpeg", make="BMW", model="M4 Competition", year=2021, miles=35155, condition="Used", code="L5U3FG")
        marketcars=[marketcar1, marketcar2, marketcar3, marketcar4]
        db.session.add_all(marketcars)
        db.session.commit()

        print("Seeding offers...")
        offer1 = Offer(email="Mark@gmail.com", phone_number="516-300-2931", offer=32500, marketcar_id=1, code="G3M1KF")
        offer11 = Offer(email="Sam@gmail.com", phone_number="999-000-1234", offer=36500, marketcar_id=1, code="G3M1KF")
        offer2 = Offer(email="Sam@gmail.com", phone_number="999-000-1234", offer=17500, marketcar_id=2, code="8W5C7D")
        offer3 = Offer(email="anon1@gmail.com", phone_number="516-300-2931", offer=15500, marketcar_id=3, code="B4H8ZP")
        offer4 = Offer(email="anon2@gmail.com", phone_number="999-000-1234", offer=62500, marketcar_id=4, code="L5U3FG")
        offers =[offer1, offer11, offer2, offer3, offer4]
        db.session.add_all(offers)
        db.session.commit()
        
        
        print("Done seeding!")

