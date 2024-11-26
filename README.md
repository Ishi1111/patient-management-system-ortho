This is an advanced Patient Management System exclusively targeted at orthodontists who can improve the record management of patients, appointments, and consultations. This system will simplify administrative work to a larger extent while providing efficient communication channels between patients, doctors, and administrators.

# ############# Prerequisites  ############### #
Before you begin, make sure the following are installed on your computer:

- Node.js (version 18 or later)
- npm (that comes pre-installed with Node.js, version 9 or later) 
- nest (version 10 or later)
- PostgreSQL 
- Git

# #############  Installation ############### #
Clone the Repository:

```bash
git clone https://github.com/Ishi1111/patient-management-system-ortho.git

cd patient-management-system-ortho
```

# ########## Install Dependencies ############# #
- To install all dependencies all together
```bash
$ npm install
```

- If npm install throws any error of version then you can use following command.
```bash
$ npm install --legacy-peer-deps 
```

===> Install Core Dependencies:

- Make sure to also have the database driver installed for PostgreSQL database. 
```bash
$ npm install pg --save --legacy-peer-deps
```

- If you are installing any specific dependency and face version issue. 
```bash
$ npm i class-transformer --legacy-peer-deps
```

- Install Authentication Packages. For password hashing:
```bash
$ npm install bcrypt @types/bcrypt
```

- Install Security and Encryption Tools. for JWT based authentication
```bash
$ npm install @nestjs/passport passport passport-jwt @types/passport-jwt --save
```

- Install Configuration Management:
```bash
$ npm i --save @nestjs/config
```

- Install ORM and Database Integration:
```bash
$ npm i --save @nestjs/typeorm typeorm
```

- Install API Documentation Tools:
```bash
$ npm install @nestjs/swagger swagger-ui-express
```

- Install Cross-Environment Tool. For managing environment variables across platforms:
```bash
$ npm install cross-env --save-dev
```

# ############# Environment Setup ############### #
Create a .env File: development.env
Update Environment Variables Open the .env file and fill up all the details, including such as:

#Server port
SERVER_PORT=5001

#Database config
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=your_user
DATABASE_PASS=your_password
DATABASE_NAME=database_name
DATABASE_SYNC=true
DATABASE_LOG=true
DATABASE_CACHE=true

#JWT config
JWT_EXPIRE_IN=604800000         #7 days
JWT_SECRET_KEY=your_jwt_key

#Cookie Parser Secret Key
COOKIE_SECRET=your_cookie_secret


## #######Compile and run the project #########
Starting the Server:

```bash
# development
$ NODE_ENV=development npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

#Build the app for production:
$ npm run build
```


# ###########  API Documentation ############# #
1. In this project, Swagger is used for API documentation.
Once the application is running, you can access the API documentation on browser at:

http://localhost:5001/api

2. Once you hit this url, your screen will look like this
https://prnt.sc/-BAcJRURQirL

3. Then you need to click on login API dropdown, you will see this 
https://prnt.sc/jGxLqgqEk3qI

4. Then click on Try it out. After then the request payload will be open & update your credentials. After that click on Execute.
https://prnt.sc/imeCKKdyCkdF

5. After that, API response will be returned with access token
https://prnt.sc/7L6gazUt0rSm

6. copy that access token. 
For example - 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJmMjkzNTgwLWMzY2EtNGM4ZC05MWM3LTNhZmYxMzg0NTgxYiIsImZpcnN0TmFtZSI6ImpvbiIsImxhc3ROYW1lIjoiZG9lIiwiZW1haWwiOiJqb24uZG9lQGdtYWlsLmNvbSIsImRhdGUiOiIxNzMyNjQ1NjU3MTIwIiwiaWF0IjoxNzMyNjQ1NjU3LCJleHAiOjIzMzc0NDU2NTd9.
ICR1c2o-DA5U3Pu1Vubc_jHptsiuvf7jub-5Xt3kLPc

7. Then you need to authorize that access token. For that you need to click on the Authorize button on the top right side which will globally authorize your token, Else you can directly click on the Lock icon which is right side of API dropdown.
https://prnt.sc/V2BMkXjaQH6a

8. - Authorize your token & then click on the cross (x) icon on the top right side.
https://prnt.sc/lHEJCrZy7TZp

9. Now you can access any API as per steps 3, 4, 5.


Note: You can create account using register API. As of now it's open for creating account for Admin, Doctor, Patient.

# ########### Project Structure ############# #
The project is structured as follows:

config
├── env/                # env folder that contains env file such as development.env
├── configuration.ts    # All modules (controller, service, repository files + dto folder with dto files)
├── validation.ts       # All modules (controller, service, repository files + dto folder with dto files)
dist                    # dist folder for the build that created automatically when we hit npm run start:dev
src/
├── app.module.ts       # Application module that contains all modules
├── modules             # All modules (controller, service, repository files + dto folder with dto files)
├── shared              # All controllers (API endpoints)
├── shared/entity/      # Database entities/models
├── shared/decorators   # Decorators like get login user & role
├── shared/guard/       # Guard for role
├── shared/interface/   # Interfaces for response & jwt payload
├── shared/enum/        # Enums for Gender, Appointment status, Role
├── shared/utility/     # Utility files filters for error handling & common functions
└── config/             # Config folder that contain configuration files for swagger & typeorm








