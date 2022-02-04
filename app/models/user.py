from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime 

followers_detail = db.Table(
    'followers',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('followers_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    full_name = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'username': self.username,
            'email': self.email,
            'created_at': self.created_at
        }

    # One post belongs to 1 user
    user = db.relationship('User', back_populates='posts')

    # Post can have many comments
    comments = db.relationship('Comment', back_populates='post')

    # Post can have many likes
    likes = db.relationship('Like', back_populates='post')

    # One post can have many photos
    photos = db.relationship('Photo', back_populates='post')

    followers = db.relationship('User', primaryjoin=(followers_detail.c.user_id == id), secondaryjoin=(followers_detail.c.follower_id == id), backref=db.backref("user_id"))
