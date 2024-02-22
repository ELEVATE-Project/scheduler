# ShikshaLokam Elevate Project Documentation

## Scheduler Service

### System Requirements

-   **Operating System:** Ubuntu 22
-   **Node.js:** v20
-   **PostgreSQL:** 16
-   **Citus:** 12.1

## Install Node.js

Refer to the [NodeSource distributions installation scripts](https://github.com/nodesource/distributions#installation-scripts) for Node.js installation.

```bash
$ curl -SLO https://deb.nodesource.com/nsolid_setup_deb.sh
$ sudo chmod 500 nsolid_setup_deb.sh
$ sudo ./nsolid_setup_deb.sh 20
$ sudo apt-get install nodejs -y
```

## Install Build Essential

```bash
$ sudo apt-get install build-essential
```


## Install PM2

Refer to [How To Set Up a Node.js Application for Production on Ubuntu 22.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-22-04).

**Exit the postgres user account**

```bash
$ exit
```

```bash
$ sudo npm install pm2@latest -g
```

## Setting up Repository

### Clone the Scheduler-service repository
```bash
$ cd /opt/
$ sudo mkdir backend
$ cd backend/
$ git clone -b develop --single-branch "https://github.com/ELEVATE-Project/scheduler.git"
```
### Install Npm packages

```bash
$ cd /opt/backend/scheduler/src
$ sudo npm i
```

### Create .env files

#### Scheduler Service

```bash
$ cd /opt/backend/scheduler/src
$ sudo nano .env
```

Copy-paste the following env variables to the `.env` file:
#### Scheduler Service

```bash
$ cd ../../scheduler/src
$ sudo nano .env
```

Copy-paste the following env variables to the `.env` file:

```env
# Scheduler Service Config

# Application Base URL
APPLICATION_BASE_URL=/scheduler/

# Kafka hosted server URL
KAFKA_URL=localhost:9092

# Kafka topic to push notification data
NOTIFICATION_KAFKA_TOPIC='develop.notifications'

# MongoDB URL
MONGODB_URL='mongodb://localhost:27017/tl-cron-rest'

# App running port
APPLICATION_PORT=4000

# Api doc URL
API_DOC_URL='/api-doc'

APPLICATION_ENV=development

ENABLE_LOG='true'

ERROR_LOG_LEVEL='silly'
DISABLE_LOG=false

DEFAULT_QUEUE='email'

REDIS_HOST='localhost'
REDIS_PORT=6379
```

Save and exit.

## Start the Services

Navigate to the src folder of interface services and run pm2 start command:

```bash
$ cd /opt/backend/scheduler/src
interface-service/src$ pm2 start app.js -i 2 --name elevate-scheduler
```

#### Run pm2 ls command

```bash
$ pm2 ls
```

Output should look like this (Sample output, might slightly differ in your installation):


```bash
┌────┬─────────────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id │ name                    │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├────┼─────────────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 15 │ elevate-scheduler       │ default     │ 1.0.0   │ cluster │ 86368    │ 47h    │ 0    │ online    │ 0%       │ 89.8mb   │ jenkins  │ disabled │
│ 16 │ elevate-scheduler       │ default     │ 1.0.0   │ cluster │ 86378    │ 47h    │ 0    │ online    │ 0%       │ 86.9mb   │ jenkins  │ disabled │
└────┴─────────────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
```

This concludes the services and dependency setup.
