# About

This repo is for testing out different solutions for reaching docker from the host machine using the same domain name everywhere. For example, this would mean running cloud-nine-backend and happy-life-bank services in docker and succsefully calling http://cloud-nine-backend:3100 from both the host machine and docker happy-life-bank service.

Branches are used to test different configurations. These configurations and potentially branch-specific setup instructions will be detailed directly below in the "This [BRANCH_NAME] branch" section.

# This "main" branch

## Configuration

This is the base case without any configuration to try and handle hostnames in a universal way.

The urls used from the host machine should be localhost, such as `http://localhost:4100`.
The urls defined in the docker-compose and used in the docker services are the actual service name such as `http://cloud-nine-backend:3100` (called from `happy-life-bank`).

## Local Environment Setup

None

# Running

Install and build backend from root directory

    ( cd backend && pnpm i && pnpm build)

Start docker containers

    docker-compose up

# Manually testing

- Go to http://localhost:3100 and see good response from service.
- Go to http://localhost:3100/d2d and seed good response from peered service.
- Go to http://cloud-nine-backend and see failed response (cant resolve the host).

Can repeat and see equivalent results for happy-life-bank (localhost:4100, ).

# About Backend services

`./backend` is a minimal web server design to test connecting from the hostmachine to a docker service and between docker services. It's used in the docker-compose to make the cloud-nine-backend and happy-life-backend services.

Endpoints:

`GET /`: Returns a message with the name of the service. This tests connecting to the service from the host machine.
`GET /d2d`: Returns a message with the name of the peered backend (in the case of cloud nine, happy life bank is the peer). Making this request causes the endpoint to reach out to the peered backend. This tests the docker-to-docker connection.
``
