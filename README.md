<!-- PROJECT LOGO -->
<br />

  <!-- ![CRUD](./CRUD.png) -->

  <h3 align="center">Sports-Scheduler</h3>

  <p align="center">
    Coding Exercise for NestJs Backend Developer
    <br />
    <a href="#markdown-header-usage"><strong>Explore the docs »</strong></a>
    <br />
    <br />


<!-- TABLE OF CONTENTS -->
## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Protected Routes](#protected-routes)
  - [For Users](#for-users)
      - [Parameters](#parameters)
      - [Responses](#responses)
      - [Parameters](#parameters-1)
      - [Responses](#responses-1)
      - [Parameters](#parameters-2)
      - [Responses](#responses-2)
  - [For Sport_Schedule](#for-sport_schedule)
      - [Parameters](#parameters-3)
      - [Responses](#responses-3)
      - [Parameters](#parameters-4)
      - [Responses](#responses-4)
- [Meet the Developer](#meet-the-developer)




<!-- ABOUT THE PROJECT -->
## About The Project

A simple NestJS REST application that schedules a sports slot with authenticated requests.


### Built With

* [Node.js](https://nodejs.org/en/)
* [NestJS](https://nestjs.com/)
* [Typescript](https://www.typescriptlang.org/)
* [MySQL](https://www.mysql.com/)
* [Docker](https://www.docker.com/)



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

* npm
```bash
npm install npm@latest -g
```

* yarn
```bash
npm install -g yarn
```
* [Docker](https://github.com/docker/docker-install)
### Installation
 
1. Clone the repo
```bash
git clone https://github.com/sanjaybaskaran/sports-scheduler.git
```

2. Configure .env
```env
MYSQL_DATABASE = "flowace"
MYSQL_ROOT_PASSWORD = "1234"

DATABASE_URL = "mysql://root:1234@localhost:3306/flowace"
SESSION_SECRET = "PNb)G9U[0gu^CMe#[i'6Ib9<?|@Gnf"
```

4. Building Docker Containers
```bash
docker-compose up -d --build
```
5. Create Database Schema
```bash
yarn migrate
``` 


<!-- USAGE EXAMPLES -->
## Usage

### Protected Routes
`GET` `/api/user`<br>
`GET` `/api/sport_schedule`<br>
`POST` `/api/sport_schedule/create`

### For Users

------------------------------------------------------------------------------------------




 <code>GET</code> <code><b>api/user</b></code> <code>(Lists all the users)</code>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> None

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{[<Array of User Data>]}`                                                         |
> | `403`         | `application/json`                | `{"statusCode": 403,"message": "Forbidden resource","error": "Forbidden"}`                            |




 <code>POST</code> <code><b>/api/user/create</b></code> <code>(Inserts a new User into database)</code>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | full_name | required  | string   | Full name of the user     |
> | email     | required  | string   | email of the user         |
> | password  | required  | string   | password of the user      |
> 


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"id":"$user_id","full_name":"$user_fullName","email":"$user_email"}`                                |
> | `400`         | `application/json`                | `{"statusCode": 400,"message": "User with that email already exists"}`                            |
> | `500`         | `application/json`                | `{"status":500,"message":"Internal server error"}`                            |


 <code>POST</code> <code><b>/api/user/login</b></code> <code>(Creates user session and logs the user in)</code>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `email` |  `required` | `string`   | `email id of the user`        |
> | `password` |  `required` | `string`   | `password of the user`        |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{{ "status": "success", "message": "Logged in" }`                                                         |
> | `401`         | `application/json`                | `{"statusCode": 401,"message": "Unauthorized"}`                            |
> | `500`         | `application/json`                | `{"status":"failure","message":"Internal Server error"}`                            |





------------------------------------------------------------------------------------------

### For Sport_Schedule

------------------------------------------------------------------------------------------


 <code>GET</code> <code><b>/api/sport_schedule</b></code> <code>(Lists all the sport schedule slots if authorized)</code>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> None

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{[<Array of slot data>]}`                                                         |
> | `403`         | `application/json`                    | `{"statusCode": 403,"message": "Forbidden resource","error": "Forbidden"}`
> | `500`         | `application/json`                | `{"status":"failure","message":"Internal server error"`                            |



 <code>POST</code> <code><b>/api/sport_schedule/create</b></code> <code>(Inserts a new sport_schedule slot into database if authorized)</code>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | `name`      |  `required` | `string`   | `Name of the sport`  |
> | `start_time`      |  `required` | `string`   | `Start time in the 24 hour format of "HH-mm"`  |
> | `end_time`      |  `required` | `string`   | `End time in the 24 hour format of "HH-mm"`  |
> | `date`      |  `required` | `string`   | `Date in the format of "10 July 2022"` |



##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{<Inserted slot data>}`                                |
> | `400`         | `application/json`                | `{"statusCode":"400","message":<validation error message>}`                            |
> | `403`         | `application/json`                    | `{"statusCode": 403,"message": "Forbidden resource","error": "Forbidden"}`
> | `500`         | `application/json`                | `{"status":"failure","message":"Internal Server Error"}`                            |





------------------------------------------------------------------------------------------

## Meet the Developer

<p> Hey everybody! My name is Sanjay Kumar Baskaran, I'm extremely grateful to have this opportunity to apply for this position. I learnt a lot while building this project 😀 </p>

<table>
  <tr>
    <td align="center"><a href="https://github.com/sanjaybaskaran01"><img src="https://avatars.githubusercontent.com/u/72266283?v=4" width="100px;" alt=""/><br /><sub><b>Sanjay Baskaran</b></sub></a><br /></td>
</tr>
</table>