# README

## Deployed Demo

- <https://node.koakh.com/>

> deployed with docker-compose and apache reverse proxy

## Development mode

```shell
$ cd someFolder
$ git clone https://github.com/koakh/ChallengeTheLastBottle.git
$ git switch developemnt
$ cd ChallengeTheLastBottle
```

### Option #1 : Development Environment

```shell
$ code .
$ yarn dev
...
  VITE v3.1.8  ready in 301 ms

  ➜  Local:   http://127.0.0.1:5173/
  ➜  Network: use --host to expose
```

> open url <http://127.0.0.1:5173/>

### Option #2 : Build and Run Docker Image

```shell
$ docker-compose up --build
# daemon mode
$ docker-compose up --build -d
...
the-last-bottle-dev-1  |   VITE v3.1.8  ready in 345 ms
the-last-bottle-dev-1  | 
the-last-bottle-dev-1  |   ➜  Local:   http://localhost:5173/
the-last-bottle-dev-1  |   ➜  Network: use --host to expose
```

> open url <http://127.0.0.1:5173/>

#### TearDown

```shell
$ yarn docker:teardown
# or
$ docker-compose down --remove-orphans
```

## Optional

### Build Docker Image

```shell
$ yarn docker:build
# or
$ docker-compose build
...
=> => naming to docker.io/library/koakh-the-last-bottle     
```

### Push docker image to Registry

```shell
$ npm run docker:push
# or
$ ./dockerpush.sh koakh-the-last-bottle 1.0.0
```

> use npm to prevent yarn problem `unauthorized: authentication required. error Command failed with exit code 1.`
