# next-js-cognito-frontend

a SPA exmaple by Next.js with amazon-cognito-auth-js

## this example illustrates

- how to use next.js with cognito
- sign up with the login page that is hosted by AWS
- sign in as existing user
- fetch id-token in a JWT
- submit user's inputs with id-token via redux-form

## key technologies

- next.js
- amazon-cognito-auth-js
- Redux
- Redux-form
- next-router
- material-ui
- eslint
- docker

## usage

remove `.sample` from `credential/cognito.json.sample`, and modify it

### development

```bash
$ docker build --target dev -t next-cognito-dev .
$ docker run -it -v $(pwd):/app -p 3111:3000 next-cognito-dev
```

access http://localhost:3111/

### production

```bash
$ docker build -t next-cognito-prod .
$ docker run -p 3000:3000 next-cognito-prod
```
