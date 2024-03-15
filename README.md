<div align="center">

# Scheduler Service

<a href="https://shikshalokam.org/elevate/">
<img
    src="https://shikshalokam.org/wp-content/uploads/2021/06/elevate-logo.png"
    height="140"
    width="300"
  />
</a>

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/ELEVATE-Project/scheduler/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/ELEVATE-Project/scheduler/tree/master)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=ELEVATE-Project_scheduler&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=ELEVATE-Project_scheduler)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=ELEVATE-Project_scheduler&metric=coverage)](https://sonarcloud.io/summary/new_code?id=ELEVATE-Project_scheduler)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=ELEVATE-Project_scheduler&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=ELEVATE-Project_scheduler)[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io)
[![Docs](https://img.shields.io/badge/Docs-success-informational)](https://elevate-docs.shikshalokam.org/mentorEd/intro)
[![Docs](https://img.shields.io/badge/API-docs-informational)](https://elevate-apis.shikshalokam.org/scheduler/api-doc)

![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/ELEVATE-Project/scheduler?filename=src%2Fpackage.json)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

<details><summary>CircleCI insights</summary>

[![CircleCI](https://dl.circleci.com/insights-snapshot/gh/ELEVATE-Project/mentoring/master/buil-and-test/badge.svg?window=30d)](https://app.circleci.com/insights/github/ELEVATE-Project/mentoring/workflows/buil-and-test/overview?branch=integration-testing&reporting-window=last-30-days&insights-snapshot=true)

</details>

<!-- <details><summary>dev</summary>

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/ELEVATE-Project/mentoring/tree/dev.svg?style=shield)](https://dl.circleci.com/status-badge/redirect/gh/ELEVATE-Project/mentoring/tree/dev)
![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/ELEVATE-Project/user/dev?filename=src%2Fpackage.json)
[![CircleCI](https://dl.circleci.com/insights-snapshot/gh/ELEVATE-Project/mentoring/dev/buil-and-test/badge.svg?window=30d)](https://app.circleci.com/insights/github/ELEVATE-Project/mentoring/workflows/buil-and-test/overview?branch=integration-testing&reporting-window=last-30-days&insights-snapshot=true)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=ELEVATE-Project_mentoring&metric=duplicated_lines_density&branch=dev)](https://sonarcloud.io/summary/new_code?id=ELEVATE-Project_mentoring)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=ELEVATE-Project_mentoring&metric=coverage&branch=dev)](https://sonarcloud.io/summary/new_code?id=ELEVATE-Project_mentoring)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=ELEVATE-Project_mentoring&metric=vulnerabilities&branch=revert-77-integration-test)](https://sonarcloud.io/summary/new_code?id=ELEVATE-Project_mentoring) -->

</details>

</br>
The Mentoring building block enables effective mentoring interactions between mentors and mentees. The capability aims to create a transparent eco-system to learn, connect, solve, and share within communities.MentorED is an open source mentoring application that facilitates peer learning and professional development by creating a community of mentors and mentees.

</div>
<br>

# System Requirements

-   **Operating System:** Ubuntu 22
-   **Node.js:** v20
-   **PostgreSQL:** 16
-   **Citus:** 12.1
-   **Apache Kafka:** 3.5.0

# Setup Options

Elevate scheduler services can be setup in local using two methods:

<details><summary>Dockerized service with local dependencies(Intermediate)</summary>

## A. Dockerized Service With Local Dependencies

**Expectation**: Run single docker containerized service with existing local (in host) or remote dependencies.

### Local Dependencies Steps

1. Update dependency (Mongo v4.1.4, Kafka etc) IP addresses in .env with "**host.docker.internal**".

    Eg:

    ```
     #MongoDb Connectivity Url
     MONGODB_URL = mongodb://host.docker.internal:27017/elevate-scheduler

     #Kafka Host Server URL
     KAFKA_URL = host.docker.external:9092
    ```

2. Find **host.docker.internal** IP address and added it to **mongod.conf** file in host.

    Eg: If **host.docker.internal** is **172.17.0.1**,
    **mongod.conf:**

    ```
    # network interfaces
    net:
        port: 27017
        bindIp: "127.0.0.1,172.17.0.1"
    ```

    Note: Steps to find **host.docker.internal** IP address & location of **mongod.conf** is operating system specific. Refer [this](https://stackoverflow.com/questions/22944631/how-to-get-the-ip-address-of-the-docker-host-from-inside-a-docker-container) for more information.

3. Build the docker image.
    ```
    /ELEVATE/scheduler$ docker build -t elevate/scheduler:1.0 .
    ```
4. Run the docker container.

    - For Mac & Windows with docker v18.03+:

        ```
        $ docker run --name user elevate/scheduler:1.0
        ```

    - For Linux:
        ```
        $ docker run --name user --add-host=host.docker.internal:host-gateway elevate/scheduler:1.0`
        ```
        Refer [this](https://stackoverflow.com/a/24326540) for more information.

### Remote Dependencies Steps

1. Update dependency (Mongo v4.1.4, Kafka etc) Ip addresses in .env with respective remote server IPs.

    Eg:

    ```
     #MongoDb Connectivity Url
     MONGODB_URL = mongodb://10.1.2.34:27017/elevate-scheduler

     #Kafka Host Server URL
     KAFKA_URL = 11.2.3.45:9092
    ```

2. Add Bind IP to **mongod.conf** in host:

    Follow instructions given [here.](https://www.digitalocean.com/community/tutorials/how-to-configure-remote-access-for-mongodb-on-ubuntu-20-04)

    Note: Instructions might differ based on MongoDB version and operating system.

3. Build the docker image.
    ```
    /ELEVATE/scheduler$ docker build -t elevate/scheduler:1.0 .
    ```
4. Run the docker container.

    ```
    $ docker run --name scheduler elevate/scheduler:1.0
    ```

</details>

<details><summary>Local Service with local dependencies(Hardest)</summary>

## B. Local Service With Local Dependencies

**Expectation**: Run single service with existing local dependencies in host (**Non-Docker Implementation**).

## Installations

### Install Node.js LTS

Refer to the [NodeSource distributions installation scripts](https://github.com/nodesource/distributions#installation-scripts) for Node.js installation.

```bash
$ curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```

### Install Build Essential

```bash
$ sudo apt-get install build-essential
```

### Install PM2

Refer to [How To Set Up a Node.js Application for Production on Ubuntu 22.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-22-04).

**Run the following command**

```bash
$ sudo npm install pm2@latest -g
```

## Setting up Repository

### Clone the scheduler repository to /opt/backend directory

```bash
opt/backend$ git clone -b develop-2.5 --single-branch "https://github.com/ELEVATE-Project/scheduler.git"
```

### Install Npm packages from src directory

```bash
backend/scheduler/src$ sudo npm i
```

### Create .env file in src directory

```bash
scheduler/src$ sudo nano .env
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

## Start the Service

Navigate to the src folder of scheduler service and run pm2 start command:

```bash
scheduler/src$ pm2 start app.js -i 2 --name elevate-scheduler
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

</details>
<br>

# Run tests

## Integration tests

```
npm run test:integration
```

To know more about integration tests and their implementation refer to the project [Wiki](https://github.com/ELEVATE-Project/user/wiki/Integration-and-Unit-testing).

## Unit tests

```
npm test
```

# Used in

This project was built to be used with [Mentoring Service](https://github.com/ELEVATE-Project/mentoring.git) and [User Service](https://github.com/ELEVATE-Project/user.git).

The frontend/mobile application [repo](https://github.com/ELEVATE-Project/mentoring-mobile-app).

You can learn more about the full implementation of MentorEd [here](https://elevate-docs.shikshalokam.org/.mentorEd/intro) .

# Team

<a href="https://github.com/ELEVATE-Project/mentoring/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ELEVATE-Project/scheduler" />
</a>

<br>

# Open Source Dependencies

Several open source dependencies that have aided Mentoring's development:

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Apache Kafka](https://img.shields.io/badge/Apache%20Kafka-000?style=for-the-badge&logo=apachekafka)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
