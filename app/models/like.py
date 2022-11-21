from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Like(db.Model):
    __tablename__ = "likes"
        if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    is_liked = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")), nullable=False)


     # 1 like belongs to 1 user
    user = db.relationship('User', back_populates='likes')

    # 1 like belongs to 1 post
    post = db.relationship('Post', back_populates='likes')

    def to_dict(self):
        return {
            'id': self.id,
            'is_liked': self.is_liked,
            'created_at': self.created_at,
            'user_id': self.user_id,
            'post_id': self.post_id,
            'user': self.user.to_dict(),
        }
