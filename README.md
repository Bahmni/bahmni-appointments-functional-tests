# Bahmni - functional tests for appointments module &nbsp; [![Build Status](https://travis-ci.org/Bahmni/bahmni-appointments-functional-tests.svg?branch=master)](https://travis-ci.org/Bahmni/bahmni-appointments-functional-tests)

## Setup

- Pre Requisites

  `Node v12.13.1`

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
