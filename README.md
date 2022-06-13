# Scheduler Service Setup Guide

Recommend to,
Install any IDE in your system(eg: VScode etc..)
Install nodejs from : https://nodejs.org/en/download/
Install mongoDB: https://docs.mongodb.com/manual/installation/
Install Robo 3T: ​​https://robomongo.org/

## 1. Cloning the scheduler repository into your system

Goto https://github.com/ELEVATE-Project/scheduler From the code tab copy the link. Using that link clone the repository into your local machine.

Let's make it more easy for you:

    1. Create a new folder where you want to clone the repository.
    2. Goto that directory through the terminal and execute the commands.

git clone https://github.com/ELEVATE-Project/scheduler.git

## 2. Add .env file to the project directory

    create  a file named as .env in src directory of the project and copy below code into that file.
    Add fallowing enviorment configs

## 3. Run mongodb locally

spacify the mongo port and ip in .env
application takes the db as specified in the .env

### Required Environment variables:

````
```
# Kafka hosted server url
KAFKA_URL = localhost:9092

# Kafka topic to push notification data
NOTIFICATION_KAFKA_TOPIC = 'notificationtopic'

# MONGODB_URL
MONGODB_URL = mongodb://localhost:27017/db_name

# App running port
APPLICATION_PORT = 4000

```
````

## 4. Install Npm
	From src directory execute :
	```javascript
    npm i
	```
    To install the dependencies in your local machine.

## 5. To Run server

    npm start

# What is scheduler service ?
Service to schedule jobs, Based on Agenda npm package. 
Provide your job REST endpoint and it’s scheduling is offered as a service. Introduce a job url, name it, give contact name and email id of person related to the job. scheduler will schedule the job for you on specified time and if any error occurs details will be shared to the specified email id.

API Documentation
-----------------

## GET:/jobs/jobList
List all job definitions from the database.

## POST:/jobs/scheduleJob

Add new job definitions. And schedule it.

Data required:
```javascript
{
	name : //Name for job,
	email : [] ////error reporting mail id/ids,   
    request : {
        url : //Job url for post || get || put || delete etc.,
        method : //post,get,put,delete,
        header : {} //header data - optional
    },
    schedule : {
         scheduleType : //every,once and now,
        interval : //time - optional ( not required for type now )
    }
}
```
## POST:/jobs/now
Schedule a defined job for immediate call(now).

Data required:  
```javascript
{
	name	//Name of the job to create instance which is already present in job definition.
}
```
## POST:/jobs/every
Schedule job for specified intervals, for repeat calls.

## POST:/jobs/once
Schedule job for a specified time.

Data required:
```javascript
{
	name, 	//Name of the job to create instance which is already present in job definition.
	interval,	//When to shedule the job
}
```
## POST:/jobs/cancel
Cancels job/jobs on specified name (does not remove definitions created by -POST api/jobs)

Data:
```javascript
{
	name //name of the job
}
```

## PUT:/jobs/:jobname
Update job definition.

## DELETE:/jobs/:jobname
Delete specified job’s definition and instances.

	
			    

	
	


