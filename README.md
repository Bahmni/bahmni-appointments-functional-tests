# Bahmni - functional tests for appointments module &nbsp; [![Build Status](https://travis-ci.org/rmkanda/bahmni-appointments-functional-tests-testcafe.svg?branch=master)](https://travis-ci.org/rmkanda/bahmni-appointments-functional-tests-testcafe)

## Setup

- Pre Requisites

  `Node v10.16.3`

- Env file
  Create a `test.env` file with below keys
  ```
  APPLICATION_URL=
  ADMIN_USERNAME=
  ADMIN_PASSWORD=
  ```
- Install dependencies with `npm install`

## Run Tests

- Run tests using `npm test`
- For running tests in a docker container

```
docker run -v $(pwd):/tests --env-file=./test.env  -it testcafe/testcafe firefox:headless /tests/specs/
```

## Contributing

- These are the steps to be run when you are ready to make a commit:

```
npm run test
npm run lint
git commit ...
```
