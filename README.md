# scheduler
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
	name,	//Name of the job to create instance.
	url,	//Job url for post || get || put || delete etc.
	owner,	//Name of the person or service which the instance belong.
	email,	//error reporting mail id.
	method, //post,get,put,delete
	scheduleType, //{ every, now, once } - specifies schedule type
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

	
			    

	
	


