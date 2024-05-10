# AgroBit
Welcome to the quotes API. 
* Quotes-API is a an Open API that allows authors to create quotes and manage their author profiles.
## API Endpoints
The following endpoints are available in the AgroBit
## Routes to use
* [http://localhost:5000/api/] 
* Using Postman
  - To make requests, you need to send
* or set up postman environment to use e.g **({{agro}}/user)**

 **For a GET Request /user/** 

**GET api/user/:id** |
* Returns a single author by  ID.

 **PATCH user/:id** 
* To Update  Information for a specific author 
# **POST user/signUp**
* Creates a new Author to the database. Requires authentication.
**POST user/login**
* Logs in an a user and returns a token which is required for  authentication in the headers


 **DELETE /user/:id**
* Deletes a user. Requires authentication.

# Project Dependencies 
**Prisma ORM**, for working with database usage :
* [setUp Prisma](npm install prisma)
* [Initialize  Prisma](npx prisma init)
* [Migrate the schema to database created and make a migration file](npx prisma prisma migrate --dev )
* [Make Changes to database created](npx prism db push)
* [add record from a client | browser](npx prisma studio)


# Testing
-**Super Test**
To install SuperTest,run npm install supertest from terminal
# Security
**jsonwebtoken**
1. I used jsonwebtoken to secure the data 
2. To install jsonwebtoken run npm install jsonwebtoken from terminal
# Data Validation
**JOI**
## Used JOI as a library for;
. I used Joi to validate all my data
. To install joi,run npm i joi from terminal


# Models
**Postgresql**
1. A Relational database known as postgres was used to create the database
2.  To SetUp Postgres visit https://www.postgresql
 [Downloand Postgresql](https://www.postgresql.org/download/)
# Contact
**For questions or support, please contact:**
* Email: jalagatha@gmail.com
* Twitter: @jalagatha
* github:@jalagatha
* project repository: 

# Acknowledgements:
-

*KCF Graduation Project:
