from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='demo', full_name= "Demo", email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', full_name= "Marnie", email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', full_name= "Bobbie", email='bobbie@aa.io', password='password')
    susie = User(
        username='susie', full_name= "Susie", email='susie@aa.io', password='password')
    john = User(
        username='john_doe', full_name= "John Doe", email='john_doe@aa.io', password='password')


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(susie)
    db.session.add(john)

    #.followers means users is followed by the appended user
    # user_being_followed.followers.append(user_following)
    demo.followers.append(marnie)
    marnie.followers.append(demo)
    bobbie.followers.append(demo)
    susie.followers.append(marnie)
    demo.followers.append(susie)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
