from flask import Blueprint, jsonify, session
from flask_login import login_required
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
                        # .join(Comment)  \
                        # .join(Like)\
                        # .join(Photo)\
    # .options(joinedload(Post.comments),
            # joinedload(Post.likes),
            # joinedload(Post.photos),
            # joinedload(Post.user)
    # ).all()
    for post in posts_by_id:
        print(post.to_dict(), '***new post******')


    return {'posts': [post.to_dict() for post in posts_by_id]}


#     q = (session.query(Group, Member, Item, Version)
#         .join(Member)
#         .join(Item)
#         .join(Version)
#         .filter(Version.name == my_version)
#         .order_by(Group.number)
#         .order_by(Member.number)
#         ).all()
# print_tree(q)

# hirzai_owners = session.query(Owner) \
#                        .join(Pony)  \
#                        .filter(Pony.breed == "Hirzai")


# Gets all the comments by specific user
@user_routes.route('/user/<int:id>/comments')
@login_required
def get_comments_by_user(id):
    comments_by_id = Comment.query.filter(Comment.user_id == id).all()
    return comments_by_id.to_dict()

# Gets all the likes that the user has made
@user_routes.route('/user/<int:id>/likes')
#@login_required
def get_likes_by_user(id):
    likes_by_id = Like.query.filter(Like.user_id == id).all()
    return likes_by_id.to_dict()
