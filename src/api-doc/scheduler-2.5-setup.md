# ShikshaLokam Elevate Project Documentation

## System Requirements

-   **Operating System:** Ubuntu 22
-   **Node.js:** v20
-   **PostgreSQL:** 16
-   **Citus:** 12.1

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

### Install Redis

Refer to [Redis Ubuntu 22.04 setup guide](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-22-04)

1. Update the package list:

    ```bash
    $ sudo apt update
    ```

2. Install Redis:

    ```bash
    $ sudo apt install redis-server
    ```

3. Configure Redis for systemd:

    ```bash
    $ sudo nano /etc/redis/redis.conf
    ```

    Find the `supervised` directive and change it to "systemd" as follows:

    ```conf
    . . .
    # If you run Redis from upstart or systemd, Redis can interact with your
    # supervision tree. Options:
    #   supervised no      - no supervision interaction
    #   supervised upstart - signal upstart by putting Redis into SIGSTOP mode
    #   supervised systemd - signal systemd by writing READY=1 to $NOTIFY_SOCKET
    #   supervised auto    - detect upstart or systemd method based on
    #                        UPSTART_JOB or NOTIFY_SOCKET environment variables
    # Note: these supervision methods only signal "process is ready."
    #       They do not enable continuous liveness pings back to your supervisor.
    supervised systemd
    . . .
    ```

    Save and exit.

4. Restart the Redis service:

    ```bash
    $ sudo systemctl restart redis.service
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