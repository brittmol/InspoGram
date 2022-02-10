from app.models import db, Comment


# Adds a demo user, you can add other users here if you want
def seed_comments():
    comment1 = Comment(comment='WOW! So handsome!' , user_id=2 , post_id=1)
    comment2 = Comment(comment='Awh you guys are soo cute!' , user_id=3 , post_id=2)
    comment3 = Comment(comment='ILY' , user_id=1 , post_id=2)
    comment4 = Comment(comment='Nice mustache!' , user_id=4 , post_id=4)
    comment5 = Comment(comment='Be careful Spiderman' , user_id=2 , post_id=5)

    comment6 = Comment(comment='you guys are dating?', user_id=4, post_id=2)
    comment7= Comment(comment='go packers', user_id=6, post_id=2)
    comment8 = Comment(comment='Aww cute couple!', user_id=6, post_id=2)
    comment9 = Comment(comment='i love aA!!!', user_id=5, post_id=6)
    comment10 = Comment(comment='best boot bamp ever', user_id=6, post_id=6)
    
    comment11 = Comment(comment='eh', user_id=2, post_id=8)
    comment12 = Comment(comment='you can use magik?', user_id=3, post_id=8)
    comment13 = Comment(comment='bootbamp', user_id=6, post_id=10)
    comment14 = Comment(comment='So cool!' , user_id=2 , post_id=1)
    
    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.add(comment10)
    db.session.add(comment11)
    db.session.add(comment12)
    db.session.add(comment13)
    db.session.add(comment14)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
