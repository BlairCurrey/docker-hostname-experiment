# About

This repo is for testing out different solutions for reaching docker from the host machine using the same domain name everywhere. For example, this would mean running cloud-nine-backend and happy-life-bank services in docker and succsefully calling http://cloud-nine-backend:3100 from both the host machine and docker happy-life-bank service.

Branches are used to test different configurations. These configurations and potentially branch-specific setup instructions will be detailed directly below in the "This [BRANCH_NAME] branch" section.

# This "bc/proxy-no-etc-hosts" branch

## Configuration

Adds the `nginxproxy/nginx-proxy` docker service and sets `VIRTUAL_HOST` environment variable in the `cloud-nine-backend` and `happy-life-bank services` without setting `/etc/hosts`. This was inspired by https://kevinjalbert.com/access-local-docker-containers-by-domain-names-instead-of-ports/ but cannot be used to the effect that I had hoped. I thought it's may circumvent needing to set /etc/hosts because the author doesn't do so, but that's because he's using a host like "whoami.localhost"
and apparently it's the `.localhost` which makes it "just work." In retrospect this makes sense, as the docker container shouldn't have any effect on how the host machine resolves hostnames. T[he proxy docker image readme](https://github.com/nginx-proxy/nginx-proxy) also explicitly mentions DNS needs to resolve the virtual host to use it from the host machine.

The urls for the hostmachine must still be localhost:3100 and localhost:4100.

## Local Environment Setup

None (just ensure there are no hlb/c9 entries in `/etc/hosts`)

# Running

Install and build backend from root directory

    ( cd backend && pnpm i && pnpm build)

Start docker containers

    docker-compose up

# Manually testing

- Go to http://localhost:3100 and see good response from service.
- Go to http://localhost:3100/d2d and seed good response from peered service.
- Go to http://cloud-nine-backend and see failed response (cant resolve the host).

Can repeat and see equivalent results for happy-life-bank.

# About Backend services

`./backend` is a minimal web server design to test connecting from the hostmachine to a docker service and between docker services. It's used in the docker-compose to make the cloud-nine-backend and happy-life-backend services.

Endpoints:

`GET /`: Returns a message with the name of the service. This tests connecting to the service from the host machine.
`GET /d2d`: Returns a message with the name of the peered backend (in the case of cloud nine, happy life bank is the peer). Making this request causes the endpoint to reach out to the peered backend. This tests the docker-to-docker connection.
``
