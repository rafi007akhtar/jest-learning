# jest-learning

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It contains code I wrote while trying to learn Jest [from the Docs](https://jestjs.io/docs/getting-started).

## Test Files
The main test file is [jest-testing.test.js](src/jest-testing.test.js).

The files getting tested are:
- [jest-testing.js](src/jest-testing.js)
- [partial.js](src/partial.js)
- [peanut-butter-module.js](src/peanut-butter-module.js)
- [peanut-butter-promise.js](src/peanut-butter-promise.js)

All these files are in the [src](./src) folder.

## Running the project
- Clone the repository
- Enter the repository
- Install dependencies
- Run the project

As shown below.
```sh
git clone https://github.com/rafi007akhtar/jest-learning.git
cd jest-learning
npm install
npm start
```

## Running the tests
Assuming the repository has been cloned and the dependencies have been installed, enter the following command to run the tests.
```sh
jest
```
Or, if you want to see the code coverage as well, run:
```sh
jest --coverage
```

### But what if ...
the tests don't run?

In that case, Jest might not be installed globally. To remedy that, enter the following in the CLI:
```sh
npm install jest --global
```
and the tests should work.

Otherwise, if you don't want to install Jest globally, enter the following alternative command.
```sh
npm run test  # equivalent to `jest`
```

## Troubleshooting
In case of the tests not working, or something getting wrong with the setup, [this](https://rafi007akhtar.notion.site/ReactJS-Learning-34272ec5d24c4df0b3731996a649db81) might help. Scroll all the way down to the section that talks about Jest, and there you will see the setup in detail I followed for this repository.
