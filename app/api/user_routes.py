from flask import Blueprint, jsonify, session
from flask_login import login_required, current_user
from app.models import User, Post, Comment, Like, Photo, db
from sqlalchemy.orm import joinedload

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
@user_routes.route('/<int:id>/posts')
#@login_required
def get_posts_by_user(id):
    print('in route ****************************************')
    # posts_by_id = Post.query.filter(Post.user_id == id).all()
    posts_by_id = db.session.query(Post) \
                        .filter(Post.user_id == id)\
                        .options(joinedload(Post.likes))\
                        .options(joinedload(Post.photos))\
                        .options(joinedload(Post.comments)).all()

    for post in posts_by_id:
        print(post.to_dict(), '***new post******')


    return {'posts': [post.to_dict() for post in posts_by_id]}




# Gets all the comments by specific user
@user_routes.route('/<int:id>/comments')
@login_required
def get_comments_by_user(id):
    comments_by_id = Comment.query.filter(Comment.user_id == id).all()
    return {'comments': [comment.to_dict()['comment'] for comment in comments_by_id]}

# Gets all the likes that the user has made
@user_routes.route('/<int:id>/likes')
@login_required
def get_likes_by_user(id):
    likes_by_id = Like.query.filter(Like.user_id == id).all()
    return {'likes': [like.to_dict()['post_id'] for like in likes_by_id] }


@user_routes.route('/<int:id>/follow', methods=["POST"])
@login_required
def follow_a_user(id):
    user = User.query.get(id)

    if(user in current_user.following):
        return {'users': [*current_user.to_dict()["following"]]}
    else:
        current_user.following.append(user)
        db.session.commit()
        return {'users': [*current_user.to_dict()["following"]]}


@user_routes.route('/<int:id>/unfollow')
@login_required
def unfollow_a_user(id):
    user = User.query.get(id)

    if(user in current_user.following):
        current_user.following.remove(user)
        db.session.commit()
        return {'users': [*current_user.to_dict()["following"]]}
    else:
        return {'users': [*current_user.to_dict()["following"]]}
