# Cypress_masterclass
*Step 1 - create a node project - npm init -y
*Step 2 - add cypress to it - npm install cypress.
*Step 3 - check package.json for cypress instalation
*Step 4 - verify cypress - npx cypress -v, npx cypress verify(if error occurs first run - npm cypress -v)
**Note if cypress verification timeout error occured(increse the timeout in node modules in verify.js(VERIFY_TEST_RUNNER = from 3000 to 10000))
*Step 5 - npx cypress open