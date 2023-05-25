[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/QtaMnqr7)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=10998097&assignment_repo_type=AssignmentRepo)
# MongooseJsLab5Template

## Initial Machine Setup

1. **Install NodeJS 18**

## Get Started

1. **Install** `npm install`
2. **Configure connection to MongoDB Atlas** - replace `<Put your connection string here>` by connection string to MongoDb Atlas in `config/db.config.js`
3. **Run the app** `npm run start`

### Linting

Code linters: [eslint](https://eslint.org/) with pluggable [Prettier](https://github.com/jlongster/prettier) configs.

- run: `npm run lint`
- fix JS errors: `lint:fix`
  Eslint configuration file: [here](.eslintrc.json)

### Testing

We use Jest for unit tests. Test file for .js should be named as .test.js and be placed along with code file.

- run unit tests: `npm run test`
- run tests with coverage: `npm run test:cover`

Refer to this [document](https://jestjs.io/docs/en/api) for more details.
