from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User( # 1
        username='demo', full_name= "Demo", email='demo@aa.io', password='password')
    mj = User( # 2
        username='real_mj', full_name= "Michelle Jones", email='michelleparker@aa.io', password='password')
    peter = User( # 3
        username='spidey_boi', full_name= "Peter Parker", email='spiderman@aa.io', password='password')
    ned = User( # 4
        username='nerdy_ned', full_name= "Ned leeds", email='nerdBald@aa.io', password='password')
    john = User( # 5
        username='john_doe', full_name= "John Doe", email='john_doe@aa.io', password='password')
    jeff = User( # 6
        username='amazing_packs', full_name="Geff Jranof", email='gopackers@aa.io', password='password')


    db.session.add(demo)
    db.session.add(mj)
    db.session.add(peter)
    db.session.add(ned)
    db.session.add(john)
    db.session.add(jeff)

    #.followers means users is followed by the appended user
    # user_being_followed.followers.append(user_following)
    demo.followers.append(mj)
    demo.followers.append(ned)
    demo.followers.append(peter)
    demo.followers.append(john)
    demo.followers.append(jeff)
    mj.followers.append(demo)
    mj.followers.append(ned)
    mj.followers.append(peter)
    peter.followers.append(demo)
    peter.followers.append(mj)
    peter.followers.append(ned)
    ned.followers.append(mj)
    ned.followers.append(demo)
    ned.followers.append(peter)
    jeff.followers.append(demo)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
