from app.models import db, Comment


# Adds a demo user, you can add other users here if you want
def seed_comments():
    comment1 = Comment(
        comment='WOW! So handsome!' , user_id=2 , post_id=1)
    comment2 = Comment(
        comment='Awh you guys are soo cute!' , user_id=3 , post_id=2)
    comment3 = Comment(
        comment='ILY' , user_id=1 , post_id=2)
    comment4 = Comment(
        comment='Nice mustache!' , user_id=3 , post_id=4)
    comment5 = Comment(
        comment='Be careful Spiderman' , user_id=2 , post_id=5)

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
