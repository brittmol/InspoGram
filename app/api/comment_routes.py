from flask import Blueprint#, jsonify
from flask_login import login_required#, current_user
from app.models import Comment, db

comments_router = Blueprint('comments', __name__)

@comments_router.route('/')
#@login_required
def get_all_comments():
    comments = Comment.query.all()
    return {'comments': [comment.to_dict() for comment in comments]}

@comments_router.route('/<int:id>/delete')
@login_required
def get_all_comments(id):
    comment = Comment.query.get(id) # grabs the post you want to delete
    db.session.delete(comment) # deletes the post from data base
    db.session.commit() # commits the changes in database
    return # exits
