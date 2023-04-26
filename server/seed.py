from datetime import datetime
from config import db, bcrypt
from models import User, Post, Community

def seed_database():
    # create some users
    alice = User(username='alice', email='alice@example.com', password='password123', password_confirmation='password123', first_name='Alice', last_name='Smith', dob=datetime(1990, 1, 1))
    bob = User(username='bob', email='bob@example.com', password='password123', password_confirmation='password123', first_name='Bob', last_name='Jones', dob=datetime(1980, 1, 1))
    carol = User(username='carol', email='carol@example.com', password='password123', password_confirmation='password123', first_name='Carol', last_name='Lee', dob=datetime(1970, 1, 1))
    db.session.add_all([alice, bob, carol])
    db.session.commit()

    # create some communities
    dark_souls = Community(name='Dark Souls', description='A community for Dark Soul nerds', video_game='Dark Souls Series', date_posted=datetime.utcnow())
    madden = Community(name='Madden', description='A community for people that break their controllers over a sports game', video_game='Madden', date_posted=datetime.utcnow())
    db.session.add_all([dark_souls, madden])
    db.session.commit()

    # create some posts
    post1 = Post(image='https://darksouls2.wiki.fextralife.com/file/Dark-Souls-2/lock-on-homepage-dark-souls-2-wiki-guide-600px-min.jpg', caption='My first post!', date_posted=datetime.utcnow(), user=alice, community=dark_souls)
    post2 = Post(image='https://uproxx.com/wp-content/uploads/2022/08/Madden-Locker-Room-Glitch-1024.jpg?w=1024&h=436&crop=1', caption='Dude, what is this glitch', date_posted=datetime.utcnow(), user=bob, community=madden)
    post3 = Post(image='https://static.bandainamcoent.eu/high/dark-souls/dark-souls-3/01-videos/1-ds3_launch_trailer.jpg', caption='Im actually terrified', date_posted=datetime.utcnow(), user=carol, community=dark_souls)
    db.session.add_all([post1, post2, post3])
    db.session.commit()

if __name__ == '__main__':
    seed_database()