# GORANIME

```
See recommendation of anime list 
* REST API endpoint for User login and register operation
* JSON formatted response
* Getting list of anime
* Getting real time data of covid19 cases in Indonesia
```

# USAGE
```
Open your text editor with Node.js in your computer and then Run `npm install`
To access all of the routes, you will need a JWT(JSON Web Token) which will automatically generated after you successfuly login.
Run `npx nodemon app.js`  to start the server
Run `live-server --host=localhost` to start the client
```

## Restful endpoints
<!-- --- -->
# URL
```
Client URL : http://localhost:5500
Server URL : http://localhost:3000
```
# List of available endpoints:
​
- `POST /register`
- `POST /login`
- `GET /anime`
- `GET /anime/:animeId`
- `GET /covid/cases`


## POST/register

>Create new user account

_Request Header_
```
  none
```
_Request Body_
```
{
  "email": "<email to get insert into>",
  "name": "<name to get insert into>",
  "password": "<password to get insert into>",
}
```
_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "email": "<posted email>",
  "name": "<posted name>",
}
```
_Response(400- bad request)_
```
{
  "Error" :  "VALIDATION_ERROR"
  "message": "Email must be unique, Name cannot be empty, Password must be more then 6 characters"
}
```

_Response (500)_
```
{
  "Error": "UNKNOWN_ERROR",
  "message": "internal server error"
}
```


## POST/login

>get all todos list


_Request Header_
```
  none
```
_Request Body_
```
{
    "email": "<User's email>",
    "password": "<User's password>"
}
```
_Response (200)_
```
{
  "access_token": <generated access token>
}
```

_Response(401- notLoggedIn)_
```
{
  "Error" :  "notLoggedIn"
  "message": "please login first"
}
```
_Response(401- wrongLogin)_
```
{
  "Error" :  "wrongLogin"
  "message": "invalid email or password"
}
```

_Response (500)_
```
{
  "Error": "internal server error",
  "message": "internal server error"
}
```

## GET/anime

>Get anime all list


__Request Header_
```
{
  access_token: token
}
```
_Request Body_
```
  none
```
_Response (200)_
```
{
    {
    "id": 1,
    "title": "aaaaaaa",
    "sybopsys": "aaaaaaa",
    "rating": "aaaaaaaaa",
    "imgUrl": "http"
  },
  {
    "id": 2,
    "title": "aaaaaaa",
    "sybopsys": "aaaaaaa",
    "rating": "aaaaaaaaa",
    "imgUrl": "http"
  },
  {
    "id": 3,
    "title": "aaaaaaa",
    "sybopsys": "aaaaaaa",
    "rating": "aaaaaaaaa",
    "imgUrl": "http"
  }
}
```
_Response(401- notLoggedIn)_
```
{
  "Error" :  "notLoggedIn"
  "message": "please login first"
}
```
_Response(404 - not found)_
```
{
  "Error": "resourceNotFound",
  "message": "not found"
}
```

_Response (500)_
```
{
  "Error": "internal server error",
  "message": "internal server error"
}
```


## GET/anime/:id

>Get anime detail by ID


__Request Header_
```
{
  access_token: token
}
```
_Request Body_
```
  none
```
_Response (200)_
```
{
  {
    "id": 3,
    "title": "aaaaaaa",
    "sybopsys": "aaaaaaa",
    "rating": "aaaaaaaaa",
    "imgUrl": "http"
  }
}
```
_Response(401- notLoggedIn)_
```
{
  "Error" :  "notLoggedIn"
  "message": "please login first"
}
```
_Response(404 - not found)_
```
{
  "Error": "resourceNotFound",
  "message": "not found"
}
```

_Response (500)_
```
{
  "Error": "internal server error",
  "message": "internal server error"
}
```

## Get/covid/cases

>Get live-data of covid cases in global term

_Request Header_
```
  none
```
_Request Body_
```
  none
```
_Response(200)_
```
{
  "population": <world population number>,
  "confirmed": <number of infected cases>,
  "recovered": <number of recovered cases>,
  "deaths": <number of deaths cases>
}
```
_Response(400- bad request)_
```
{
  "Error" :  VALIDATION_ERROR
  "message": "Title cannot be empty, Description cannot be empty, Due date must be today or more than today, Due Date cannot be empty"
}
```

_Response (500)_
```
{
  "Error": "internal server error",
  "message": "internal server error"
}
```