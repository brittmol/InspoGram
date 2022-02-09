from flask import Blueprint, request#, jsonify
from flask_login import login_required#, current_user
from app.models import Comment, db

comments_router = Blueprint('comments', __name__)

@comments_router.route('/')
# @login_required
def get_all_comments():
    comments = Comment.query.all()
    return {'comments': [comment.to_dict() for comment in comments]}

# edits the ocmment
@comments_router.route('/<int:id>/edit', methods=['PATCH'])
@login_required
def edit_comment(id):
    req = request.json # grabs the newly edited comment
    comment = Comment.query.get(id) # grabs the post you want to edit
    if(len(req['comment'])):
        comment.comment = req['comment'] # replaces old comment with new one
        db.session.commit() # commits the changes in database
    print(comment.to_dict(), 'dajhdiashduiuasdiu****************************')
    return comment.to_dict()

@comments_router.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id) # grabs the post you want to delete
    db.session.delete(comment) # deletes the post from data base
    db.session.commit() # commits the changes in database
    return # exits
