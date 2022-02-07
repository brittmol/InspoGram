from app.models import db, Post


# Adds a demo user, you can add other users here if you want
def seed_posts():
    post1 = Post(
        caption='Roping around', user_id=1)
    post2 = Post(
        caption='Love of my life', user_id=2)
    post3 = Post(
        caption='Laying in bed', user_id=1)
    post4 = Post(
        caption='My role model', user_id=1)
    post5 = Post(
        caption='My spidey senses are tingling', user_id=1)

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
