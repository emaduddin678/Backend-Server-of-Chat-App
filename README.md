# Backend-Server-of-Chat-App

## GitHub Repository Link

#### Chit Chat Application

```http
https://github.com/emaduddin678/Backend-Server-of-Chat-App.git
```

## Tech Stack

**Server:** Node.js, Express.js, MongoDb, mongoose, nodemailer, nodemon, bcryptjs, cookie-parser, cors, dotenv, express, express-validation, http-errors, jsonwebtoken.

## Server API Reference

#### Base API

```http
  https://backend-server-of-chat-app.vercel.app/
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `/`       | `string` | **Required**. For all API request. |

#### Get all user

```http
  GET /api/user/
```
#### Get single user by id
```http
  GET /api/user/:id([0-9a-fA-F]{24})
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. User id |

#### Register User Account

```http
  GET /api/user/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `{name, email, password, profile_pic}`      | `{string, string, string, string}` | **Required**. Register an account with verified email. Get an email to **Activate** your accoutn. |


#### Activate User Account by token

```http
  GET /api/user/activate/:token
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. You will find this api with token in your email |

 
## Authors

- [Emad Uddin Emad](https://github.com/emaduddin678)
