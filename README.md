
# SONAR :SERVER

> A simple customer tracker app built as part test for the role of a fullstack Developer @YIP Online Ltd


## Built With

- Express
- MongoDB
- NodeJs

# Front-end Repo
- [https://github.com/PromzzyKoncepts/Sonar](https://github.com/PromzzyKoncepts/Sonar)

## Live Demo 

[API Link](https://sonar-server.onrender.com)



### RESTful API Node Express Mongoose Example

The project builds RESTful APIs using Node.js, Express and Mongoose, ...

## Manual Installation

Clone the repo:

```bash
git clone https://github.com/PromzzyKoncepts/Sonar-Server.git
cd Sonar-Server
```

Install the dependencies:

```bash
npm install
```


Generate JWT RS256 key:

```bash
ssh-keygen -t rsa -P "" -b 2048 -m PEM -f storage/jwtRS256.key
ssh-keygen -e -m PEM -f storage/jwtRS256.key > storage/jwtRS256.key.pub
# encode base64
cat storage/jwtRS256.key | base64 # edit JWT_ACCESS_TOKEN_SECRET_PRIVATE in .env
cat storage/jwtRS256.key.pub | base64 # edit JWT_ACCESS_TOKEN_SECRET_PUBLIC in .env
```

## Table of Contents

- [Commands](#commands)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)

## Commands

Running in development:

```bash
npm run dev
```



## Project Structure

```
auth\
 |--api\         # Environment variables and configuration
   |--middlewares\    # Custom express middlewares
   |--routes\    # Routes
 |--db\    # Databse and connection
   |--models\         # Mongoose models
     |--user.js         # model for user schema
     |--userDetails.js       # model for User's personal Info schema
   |--connection.js          # Express, mongoose and Database connection
 |--app.js    # Express and MongoDb integration
 |--server.js        # App entry point
 |--helper.js    # setup to assist devs to create their secret key
```

### API Endpoints

List of available routes:

**Auth routes**:\
`POST /user/register` - Signup\
`POST /user/login` - Signin\
`POST /user/login` - upload user info\
`GET /user/info` - fetch user info\


## Authors

👤 **Author1**

- GitHub: [@PromzzyKoncepts](https://github.com/PromzzyKoncepts)
- Twitter: [@pr0mzzy](https://twitter.com/pr0mzzy)
- LinkedIn: [promiseokechukwu](https://linkedin.com/in/promiseokechukwu)


## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](../../issues/).

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgments

- Google Map APIs
- Me for the UI design

## 📝 License

This project is [MIT](./LICENSE) licensed.

_NOTE: we recommend using the [MIT license](https://choosealicense.com/licenses/mit/) - you can set it up quickly by [using templates available on GitHub](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/adding-a-license-to-a-repository). You can also use [any other license](https://choosealicense.com/licenses/) if you wish._
