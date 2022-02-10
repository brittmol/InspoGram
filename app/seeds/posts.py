from app.models import db, Post


# Adds a demo user, you can add other users here if you want
def seed_posts():
    post1 = Post(caption='my cool suit', user_id=3)
    post2 = Post(caption='Love of my life', user_id=2)
    post3 = Post(caption='Laying in bed', user_id=3)
    post4 = Post(caption='My role model', user_id=3)
    post5 = Post(caption='My spidey senses are tingling', user_id=3)

    post6 = Post(caption='Join our bootbamp', user_id=1)
    post7 = Post(caption='Our lovely red logo', user_id=1)
    post8 = Post(caption="I'm a wizard ha-rry", user_id=4)
    post9 = Post(caption='other me?', user_id=3)
    post10 = Post(caption='My boi', user_id=6)


    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.add(post8)
    db.session.add(post9)
    db.session.add(post10)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
