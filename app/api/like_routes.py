from flask import Blueprint#, jsonify
from flask_login import login_required#, current_user
from app.models import Like

likes_router = Blueprint('likes', __name__)

@likes_router.route('/')
@login_required
def get_all_likes():
    likes = Like.query.all()
    return {'likes': [like.to_dict() for like in likes]}
