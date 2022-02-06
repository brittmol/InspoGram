from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Post, Comment, Like, Photo

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


# Gets all the post created by that specific user
@user_routes.route('/user/<int:id>/posts')
#@login_required
def get_posts_by_user(id):
    posts_by_id = Post.query.filter(Post.user_id == id).all()
    return posts_by_id.to_dict()

# Gets all the comments by specific user
@user_routes.route('/user/<int:id>/comments')
#@login_required
def get_comments_by_user(id):
    comments_by_id = Comment.query.filter(Comment.user_id == id).all()
    return comments_by_id.to_dict()

# Gets all the likes that the user has made
@user_routes.route('/user/<int:id>/likes')
#@login_required
def get_likes_by_user(id):
    likes_by_id = Like.query.filter(Like.user_id == id).all()
    return likes_by_id.to_dict()
