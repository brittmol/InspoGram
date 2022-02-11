"""empty message

Revision ID: 64b08fb66b0d
Revises: 99e5d246720b
Create Date: 2022-02-11 12:47:44.270306

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '64b08fb66b0d'
down_revision = '99e5d246720b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('profile_image_url', sa.String(length=255), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'profile_image_url')
    # ### end Alembic commands ###
