from flask.cli import AppGroup
from .users import seed_users, undo_users
from .posts import seed_posts, undo_posts
from .photos import seed_photos, undo_photos
from .comments import seed_comments, undo_comments
from .likes import seed_likes, undo_likes
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding, truncate all tables prefixed with schema name
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        # Add a truncate command here for every table that will be seeded.
        db.session.commit()
    seed_users()
    seed_posts()
    seed_photos()
    seed_comments()
    seed_likes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_posts()
    undo_photos()
    undo_comments()
    undo_likes()
    # Add other undo functions here


# Creates the `flask seed reset` command
@seed_commands.command('reset')
def reset():
    undo_users()
    undo_posts()
    undo_photos()
    undo_comments()
    undo_likes()
    seed_users()
    seed_posts()
    seed_photos()
    seed_comments()
    seed_likes()
    # Add other undo functions here
