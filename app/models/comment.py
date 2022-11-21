from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Comment(db.Model):
    __tablename__ = "comments"
        if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.now())
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'comment': self.comment,
            'created_at': self.created_at,
            'user_id': self.user_id,
            'post_id': self.post_id,
            'user': self.user.to_dict()
        }

    # 1 comment belongs to 1 user
    user = db.relationship('User', back_populates='comments')

    # 1 comment belongs to 1 post (but can post many time on same post thus not many to many)
    post = db.relationship('Post', back_populates='comments')
