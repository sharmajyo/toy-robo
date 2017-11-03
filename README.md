# toy robot
- this application is a command line solution to implement toy robot as described in PROBLEM.md.
the codebase in js and expected to run by node on terminal.


#assumptions
- program will keep running and accepting user inputs unless user quits it.
- commands are case insensitive and user data should be sanitised by trimming white spaces. A left or LEFT means same action.
- at any point in time, user can check the location of robot by giving REPORT command and it will be printed on terminal.
- all invalid or incomplete commands should not be accepted by Robot and feedback should be given to user.


#setup
run `npm install` from your terminal to install all dependencies.
run `npm start` to run app in terminal


# libraries used
inquirer is used for managing use interaction on CLI
lodash is used for various operations on objects
sinon is used for faking user interaction on command line while unit testing
eslint with airbnb base is used for checking linting errors
mocha is used for unit testing


# scripts
npm start - to run the app
npm test - to run unit tests
npm run lint - to check linting


# technical description
index.js is the starting point for app and it asks for user input in CLI.
/lib contains the Robot class and other properties of robot.
/util contains methods like parsing user input or logging data.
/const contains all string literals and other constants.
/test contains unit tests for project following the exact project structure and all branched are covered in tests.
/tests/mock has possible examples one can use to play with app. Same dataset is used in unit tests so if you want to do an automated testing just run unit test.
while running unit tests, console logging is disabled. Information texts are only shown during a normal run so that user can get a feedback for his actions.
