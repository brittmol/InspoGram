from .db import db
from datetime import datetime

class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    caption = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.now())
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)


    # One post belongs to 1 user
    user = db.relationship('User', back_populates='posts')

    # Post can have many comments
    comments = db.relationship('Comment', back_populates='post', cascade="all, delete-orphan")

    # Post can have many likes
    likes = db.relationship('Like', back_populates='post', cascade="all, delete-orphan")

    # One post can have many photos
    photos = db.relationship('Photo', back_populates='post', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'caption': self.caption,
            'created_at': self.created_at,
            'user_id': self.user_id,
            'comments':[comment.to_dict() for comment in self.comments]
            
        }
