# About

This repo is for testing out different solutions for reaching docker from the host machine using the same domain name everywhere. For example, this would mean running cloud-nine-backend and happy-life-bank services in docker and succsefully calling http://cloud-nine-backend:3100 from both the host machine and docker happy-life-bank service.

Branches are used to test different configurations. These configurations and potentially branch-specific setup instructions will be detailed directly below in the "This [BRANCH_NAME] branch" section.

# This "bc/add-etc-hosts-no-proxy" branch

## Configuration

This is the base case plus adding cloud-nine-wallet and happy-life-bank services to the host machine's `/etc/hosts` file.

The Urls from the hostmachine can use the service name `http://cloud-nine-backend:3100`.

## Local Environment Setup

Add the following lines to `/etc/hosts`:

    127.0.0.1 cloud-nine-backend
    127.0.0.1 happy-life-backend

# Running

## First time setup:

Install and build backend from root directory

    ( cd backend && pnpm i && pnpm build)

## Run

Start docker containers

    docker-compose up

# Manually testing

- Go to http://localhost:3100 and see good response from service.
- Go to http://localhost:3100/d2d and seed good response from peered service.
- Go to http://cloud-nine-backend and see successful response.
- Go to http://cloud-nine-backend:3100/d2d and see successful response.

Can repeat and see equivalent results for happy-life-bank (localhost:4100, ).

# About Backend services

`./backend` is a minimal web server design to test connecting from the hostmachine to a docker service and between docker services. It's used in the docker-compose to make the cloud-nine-backend and happy-life-backend services.

Endpoints:

`GET /`: Returns a message with the name of the service. This tests connecting to the service from the host machine.
`GET /d2d`: Returns a message with the name of the peered backend (in the case of cloud nine, happy life bank is the peer). Making this request causes the endpoint to reach out to the peered backend. This tests the docker-to-docker connection.
``
