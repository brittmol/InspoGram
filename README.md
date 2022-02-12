<h1 align='center' style='font-weight: bold'> Inspogram </h1>
<div>
<p align='center'> Inspogram is a project, inspired by <a style='font-weight: bold' href='https://www.instagram.com/'>Instagram</a>. It's a social media platform, where people can share pictures and other users can comment, like a post as well on other people. 
</br>
</p>

</div>

<h1 align='center' style='font-weight: bold'> Index </h1>
<br>
<div align='center' style='font-weight: bold'>
 <a href='https://github.com/PeterShinnn/python-group-project/wiki/Feature-List'>Feature List</a> - <a href='https://github.com/PeterShinnn/python-group-project/wiki/Database-Schema'>DB Schema</a> - <a href='https://github.com/PeterShinnn/python-group-project/wiki/API-Routes'>API Documentation</a> - <a href='https://github.com/PeterShinnn/python-group-project/wiki/Frontend-Routes'> Frontend Routes </a>
<br>
</br>
</div>
<div align='center'>
<h1 align='center' style='font-weight: bold'>Technologies Used </h1>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"  height=40/>
</div>
<br>
</br>
<h1 align='center' style='font-weight: bold'> Getting Started </h1>

## Getting started

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

***
*IMPORTANT!*
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:

   ```bash
   pipenv lock -r > requirements.txt
   ```
<h1 align='center' style='font-weight: bold'> Index </h1>
<br>

### Feature List

#### Splash Page & User Authentication
User can either log in with an exisiting account or sign up to create a new account. Alternatively if the user doesn't want to make an account, they can log using the demo user link.
<br>
[![1.png align='center'](https://i.postimg.cc/qRGDBBTS/1.png)](https://postimg.cc/TLpJC6hJ)

#### User Feed Page
When a user logs in or sign ups, they will be redirected to the feed page, where they'll be able to view other people's post that they follow, along with having the ability to like and comment on their specific post.
[![2.png align='center'](https://i.postimg.cc/8zM8v6gr/2.png)](https://postimg.cc/FYrn51R9)

#### Creating Post
By clicking the + button on the navigation bar, logged in user can create a post on their profile picture for other people to see that decides to go on your page, or that is already following you
[![1.png](https://i.postimg.cc/1t7BzsM3/1.png)](https://postimg.cc/Fdc3Wt2M)
[![2.png](https://i.postimg.cc/BbdCxprW/2.png)](https://postimg.cc/SYf846QV)

#### Liking/Unliking a Post 
User can click the heart to like or unlike the post. The heart will be filled if a user has liked the post either wirse it'll display an empty heart for the user to like
[![3.png align='center'](https://i.postimg.cc/xj5L0xkX/3.png)](https://postimg.cc/Yj4vRxz7)
[![4.png align='center'](https://i.postimg.cc/15zw4G6J/4.png)](https://postimg.cc/QVRHyWfT)

#### Viewing Comment
In the feed page, the user will be able to view the last comment of the post, but if they want to see more, they can click the view all comments link be bring up a post detail modal to see all the comments that are on the post
[![5.png align='center'](https://i.postimg.cc/gkBRhxHd/5.png)](https://postimg.cc/mtCtf2n6)

### Editing Comment
To edit your own comment, user must find the comment that they wrote in the post detail, and next to their comment, there will be a three ... menu that will bring up a pop-up modal to edit or delete your own comment
[![4.png align='center'](https://i.postimg.cc/brGTDWFH/4.png)](https://postimg.cc/wRpJnfz7
[![5.png align='center'](https://i.postimg.cc/66SzJ6yH/5.png)](https://postimg.cc/bdx11h0b)

#### Edit/Deleting a post
To delete a post, the owner of the post must go to their own profile page and click the three ... that is on the top of the post detail modal and another pop-up will come up prompting the user whether they want to edit the description/caption of their post or delete it.
[![3.png align='center'](https://i.postimg.cc/J4kx1wXR/3.png)](https://postimg.cc/tY9W5MDc)

