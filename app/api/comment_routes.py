from flask import Blueprint#, jsonify
from flask_login import login_required#, current_user
from app.models import Comment

comments_router = Blueprint('comments', __name__)

@comments_router.route('/')
#@login_required
def get_all_comments():
    comments = Comment.query.all()
    return {'comments': [comment.to_dict() for comment in comments]}
