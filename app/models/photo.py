from .db import db, environment, SCHEMA, add_prefix_for_prod

class Photo(db.Model):
    __tablename__ = "photos"
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    photo = db.Column(db.String(255), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")), nullable=False)


    # One photo belongs to 1 post
    post = db.relationship('Post', back_populates="photos")

    def to_dict(self):
        return {
            'id': self.id,
            'photo': self.photo,
            'post_id': self.post_id,
            # 'post': self.post.to_dict()
        }
