from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app import app
from models import db, User, Post, Community

if __name__ == '__main__':
    with app.app_context():
        
        print("Starting seed...")
        # create some users
        alice = User(username='alice', email='alice@example.com', first_name='Alice', last_name='Smith', dob='1/22/2001')
        alice.password_hash = 'password123'
        
        bob = User(username='bob', email='bob@example.com', first_name='Bob', last_name='Jones', dob='2/14/1978')
        bob.password_hash = 'password123'
        
        carol = User(username='carol', email='carol@example.com', first_name='Carol', last_name='Lee', dob='7/27/1959')
        carol.password_hash = 'password123'
        
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
        
        print('Seeding Successful!')
