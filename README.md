# gocity
Automation framework using Cypress.io

Installation
--------------

Install Cypress via npm:

cd /your/project/path
npm install cypress --save-dev

Make sure that you have already run npm init or have a node_modules folder or package.json file in the root of your project to ensure cypress is installed in the correct directory.

Installing Cypress via yarn
-------------------

cd /your/project/path


yarn add cypress --dev


If you’re not using Node or npm, you can  download Cypress directly from https://download.cypress.io/desktop

Prerequisite
---------------

Set chromeWebSecurity to false in your configuration file (cypress.json by default)`
{
  "chromeWebSecurity": false
}



Copy Test case file
----------------------
Copy the gocity.js under /Users/rla02/cypress/integration


Opening Cypress
----------------
./node_modules/.bin/cypress open



Improvements:
1. Happy path of the Payment process, which can be done connecting to Braintree test setup and using test credit card and paypal details.
2. Test scenarios can be seperated out for various pages and actions
3. Tests data parametrisation for testing various passes etc
4. Wait methods
5. Improve some of the assertions and locators



