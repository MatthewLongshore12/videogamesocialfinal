from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app import app
from models import db, User, Post, Community

if __name__ == '__main__':
    with app.app_context():
        
        print("Starting seed...")
        # create some users
        matthew = User(username='juiced', email='juiced@gmail.com', first_name='Matthew', last_name='Longshore', dob='1/22/2001', profile_picture='https://stickerswiki.ams3.cdn.digitaloceanspaces.com/MY_SASUKE_MANGA_STIKERS/2436536.512.webp')
        matthew.password_hash = 'Matthew1-'
        
        sarra = User(username='Sarra13', email='Sarra13@icloud.com', first_name='Sarra', last_name='Leila', dob='2/13/2003', profile_picture='https://d.newsweek.com/en/full/1920025/cat-its-mouth-open.jpg')
        sarra.password_hash = 'Teddyeats1-'
        
        tony = User(username='tlreds', email='tlreds@att.net', first_name='Tony', last_name='Longshore', dob='3/3/1959', profile_picture='https://alumni.uga.edu/wp-content/uploads/10_Uga_X.jpg')
        tony.password_hash = 'Baseball1-'
        
        db.session.add_all([matthew, sarra, tony])
        db.session.commit()

        # create some communities
        dark_souls = Community(name='Dark Souls', description='A community for Dark Soul nerds', video_game='Dark Souls Series', date_posted=datetime.utcnow(), image='https://static.bandainamcoent.eu/high/dark-souls/dark-souls-hd/00-page-setup/ds-hd_game_thumb_408x314.jpg')
        madden = Community(name='Madden', description='A community for people that break their controllers over a sports game', video_game='Madden', date_posted=datetime.utcnow(), image='https://a.espncdn.com/i/eticket/20100803/photos/etick_maddenretro1989-90_800.jpg')
        db.session.add_all([dark_souls, madden])
        db.session.commit()

        # create some posts
        post1 = Post(image='https://darksouls2.wiki.fextralife.com/file/Dark-Souls-2/lock-on-homepage-dark-souls-2-wiki-guide-600px-min.jpg', caption='My first post!', date_posted=datetime.utcnow(), user=matthew, community=dark_souls)
        post2 = Post(image='https://uproxx.com/wp-content/uploads/2022/08/Madden-Locker-Room-Glitch-1024.jpg?w=1024&h=436&crop=1', caption='Dude, what is this glitch', date_posted=datetime.utcnow(), user=sarra, community=madden)
        post3 = Post(image='https://static.bandainamcoent.eu/high/dark-souls/dark-souls-3/01-videos/1-ds3_launch_trailer.jpg', caption='Im actually terrified', date_posted=datetime.utcnow(), user=tony, community=dark_souls)
        db.session.add_all([post1, post2, post3])
        db.session.commit()
        
        print('Seeding Successful!')
