from app.models import db, Photo


# Adds a demo user, you can add other users here if you want
def seed_photos():
    photo1 = Photo(
        photo='https://image.api.playstation.com/vulcan/img/rnd/202011/0714/Cu9fyu6DM41JPekXLf1neF9r.png' , post_id=1)
    photo2 = Photo(
        photo='https://images.popbuzz.com/images/275856?width=660&crop=16_9&signature=HClDpbpwNuQw6DLaR3vnsaxP3Es=' , post_id=2)
    photo3 = Photo(
        photo='https://www.looper.com/img/gallery/why-the-mj-scene-in-the-new-spider-man-no-way-home-trailer-means-more-than-you-think/intro-1637167564.jpg' , post_id=3)
    photo4 = Photo(
        photo='https://www.giantfreakinrobot.com/wp-content/uploads/2021/03/robert-downey-iron-man-900x506.jpg' , post_id=4)
    photo5 = Photo(
        photo='https://stylecaster.com/wp-content/uploads/2021/11/Spider-Man-No-Way-Home-2.jpg', post_id=5)
    photo6 = Photo(
        photo='https://assets-global.website-files.com/5dcc7f8c449e597ed83356b8/5faae1191b673c881b077e1f_ogaa-min.png', post_id=6)
    
    photo7 = Photo(photo='https://techjobstour.com/wp-content/uploads/2017/05/appacademylogo.png', post_id=7)
    photo8 = Photo(photo='https://i.ytimg.com/vi/n0FulY88A2c/maxresdefault.jpg', post_id=8)
    photo9 = Photo(photo='https://cdn.mos.cms.futurecdn.net/XSSP3a7JNHWxCnhKwX38y8.jpg', post_id=9)
    photo10 = Photo(photo='https://newscdn2.weigelbroadcasting.com/OTn6N-1635519411-210504-blog-packers%20cardinals%20face.jpg', post_id=10)

    db.session.add(photo1)
    db.session.add(photo2)
    db.session.add(photo3)
    db.session.add(photo4)
    db.session.add(photo5)
    db.session.add(photo6)
    db.session.add(photo7)
    db.session.add(photo8)
    db.session.add(photo9)
    db.session.add(photo10)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_photos():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
