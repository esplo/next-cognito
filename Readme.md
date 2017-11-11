# next-js-cognito-frontend

A Next.js example with amazon-cognito-auth-js.

## this example illustrates

- how to use next.js with cognito
- sign up with the login page that is hosted by AWS
- sign in as existing user
- fetch id-token in a JWT
- submit user's inputs with id-token via redux-form

## keywords

- next.js
- amazon-cognito-auth-js
- Redux
- Redux-form
- material-ui
- eslint
- docker

## usage

### development

```bash
$ docker build -f Dockerfile.dev -t next-cognito-dev .
$ docker run -it -v .:/app -p 3111:3000 next-cognito-dev
```

### production

```bash
$ docker build -f Dockerfile.prod -t next-cognito-prod .
$ docker run -p 3000:3000 next-cognito-prod
```
