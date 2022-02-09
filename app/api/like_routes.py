from flask import Blueprint#, jsonify
from flask_login import login_required, current_user
from app.models import Like

likes_router = Blueprint('likes', __name__)

@likes_router.route('/')
@login_required
def get_all_likes():
    likes = Like.query.all()
    return {'likes': [like.to_dict() for like in likes]}

@likes_router.route('/<int:id>/likes/delete', methods=['DELETE'])
@login_required
def get_edit_likes_by_post(id):
    like = Like.query.filter(post_id=id, user_id=current_user.id).get()

    return like.to_dict()
