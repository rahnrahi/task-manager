# Task Manager RESTful API

The `/client` and `/server` project components can be installed and ran independently.

### Project Components

* `/client`
	* ReactJS frontend
* `/server`
	* Node  TypeScript API
	* MySQL database (sequalize ORM)
	* API documented in Swagger http://localhost:5001/swagger

### Project Setup

**1.** In the `/client` folder, configure .env file and map Docker ports to db connection.
```sh
cp .env-sample .env
In env file put below ENV VARS
REACT_APP_API_URL=http://localhost:5001/api

``` 

**2.** In the `/server` folder, configure .env file and map Docker ports to db connection.
```sh
cp .env-sample .env
In env file put below ENV VARS
process.env.DB_HOST 
process.env.DB_USER
process.env.DB_PASS 
process.env.DB_NAME
``` 
**3.** Create tmpdb folder in project root 

**4.** Build Adminer, and MySQL containers
```sh
docker-compose up
```
Or, run all services in the background
```sh
docker-compose up -d
```

### Up and running
Site URL: `http://localhost:3000/`
Swagger API: `http://localhost:5001/swagger`
API root: `http://localhost:5001/api`
Adminer root: `http://localhost:8000`
redis: `http://localhost:6379`

### Shutting down
```sh
docker-compose down
```
Stop and remove all containers, networks, and images 
```sh
docker-compose down --rmi all
```

**5.** create initial DB named tasks
```sh
Login to adminer: `http://localhost:8000`
user credentials:
username: root
password: rootpassword
```