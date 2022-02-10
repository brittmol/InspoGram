from app.models import db, Like


# Adds a demo user, you can add other users here if you want
def seed_likes():
    like1 = Like(is_liked=True, user_id=1, post_id=2)
    like2 = Like(is_liked=True, user_id=2, post_id=4)
    like3 = Like(is_liked=True, user_id=3, post_id=5)
    like4 = Like(is_liked=True, user_id=4, post_id=2)
    like5 = Like(is_liked=True, user_id=5, post_id=2)

    like6 = Like(is_liked=True, user_id=3, post_id=2)
    like7 = Like(is_liked=True, user_id=5, post_id=2)
    like8 = Like(is_liked=True, user_id=6, post_id=2)
    like9 = Like(is_liked=True, user_id=6, post_id=10)
    like10 = Like(is_liked=True, user_id=5, post_id=9)

    like11 = Like(is_liked=True, user_id=2, post_id=8)
    like12 = Like(is_liked=True, user_id=3, post_id=8)
    like13 = Like(is_liked=True, user_id=4, post_id=8)
    like14 = Like(is_liked=True, user_id=6, post_id=6)
    like15 = Like(is_liked=True, user_id=6, post_id=7)
    like16 = Like(is_liked=True, user_id=2, post_id=1)

    db.session.add(like1)
    db.session.add(like2)
    db.session.add(like3)
    db.session.add(like4)
    db.session.add(like5)
    db.session.add(like6)
    db.session.add(like7)
    db.session.add(like8)
    db.session.add(like9)
    db.session.add(like10)
    db.session.add(like11)
    db.session.add(like12)
    db.session.add(like13)
    db.session.add(like14)
    db.session.add(like15)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_likes():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
