import { LoginPage } from "./pages/login"

const loginPage = new LoginPage()

//Test that assures the Login page is reachable
//and contains all the nessesary attributes for the user
//to login as input fields and login buttons.
describe('Login Page', function () {
  it('Page validation', function () {
    cy.visit('https://www.saucedemo.com/')
    cy.get('.login_logo').should('contain', 'Swag Labs').and('be.visible')
    cy.get(loginPage.username_textbox).should('have.attr', 'placeholder', 'Username').type('username')
    cy.get(loginPage.username_textbox).should('have.value', 'username')
    cy.get(loginPage.password_textbox).should('have.attr', 'placeholder', 'Password').type('password')
    cy.get(loginPage.password_textbox).should('have.value', 'password')
    cy.get(loginPage.login_button).should('contain', 'Login').click()
  })
})


describe('All Login Tests', function () {
  //Access the link before each test
  //to ensure independent testing of each
  //scenario
  beforeEach(function () {
    cy.visit('https://www.saucedemo.com/')
    cy.get('.error-message-container').should('contain', '')
  })
  //after valid credentials are inputted
  //user is redirected to another page
  it("Valid input login", function () {
    loginPage.enterUsername('standard_user')
    loginPage.enterPassword('secret_sauce')
    loginPage.clickLogin()
    cy.url().should('include', '/inventory')
  })
  it("Invalid username login", function () {
    loginPage.enterUsername('Admin123')
    loginPage.enterPassword('secret_sauce')
    loginPage.clickLogin()
    cy.get('[data-test="error"]').should('be.visible')
    cy.contains('Login')
  })
  it("Invalid password login", function () {
    loginPage.enterUsername('standard_user')
    loginPage.enterPassword('admin123')
    loginPage.clickLogin()
    cy.get('[data-test="error"]').should('be.visible')
    cy.contains('Login')
  })
  it("Invalid credentials login", function () {
    loginPage.enterUsername('Admin123')
    loginPage.enterPassword('admin123')
    loginPage.clickLogin()
    cy.get('[data-test="error"]').should('be.visible')
    cy.contains('Login')
  })
  it("Empty credentials", function () {
    loginPage.enterUsername(' ')
    loginPage.enterPassword(' ')
    loginPage.clickLogin()
    cy.get('[data-test="error"]').should('be.visible')
    cy.contains('Login')
  })
  it("Empty username", function () {

    loginPage.enterUsername(' ')
    loginPage.enterPassword('secret_sauce')
    loginPage.clickLogin()
    cy.get('[data-test="error"]').should('be.visible')
    cy.contains('Login')
  })
  it("Empty password", function () {
    loginPage.enterUsername('standard_user ')
    loginPage.enterPassword(' ')
    loginPage.clickLogin()
    cy.get('[data-test="error"]').should('be.visible')
    cy.contains('Login')
  })
  //Although we cannot ensure that majority
  //of edge cases below did not cause any internal problems
  //at least we can verify they do not cause issues in UI
  //and do not crash the server
  it("Overly long user input", function () {
    loginPage.enterUsername('standard_userstandard_userstandard_userstandard_userstandard_userstandard_user ')
    loginPage.enterPassword('secret_sauceecret_sauceecret_sauceecret_sauceecret_sauceecret_sauceecret_sauce ')
    loginPage.clickLogin()
    cy.get('[data-test="error"]').should('be.visible')
    cy.contains('Login')
  })

  it("SQL injection password", function () {
    loginPage.enterUsername('standard_user')
    loginPage.enterPassword('21&apos; OR 1=1-- ')
    loginPage.clickLogin()
    cy.get('[data-test="error"]').should('be.visible')
    cy.contains('Login')
  })

  it("SQL injection username", function () {
    loginPage.enterUsername('&apos; OR 1=1--')
    loginPage.enterPassword('secret_sauce')
    loginPage.clickLogin()
    cy.get('[data-test="error"]').should('be.visible')
    cy.contains('Login')
  })

  it("Javascript injection", function () {
    loginPage.enterUsername('<script>alert(2)</script>')
    loginPage.enterPassword('<script>alert(1)</script>')
    loginPage.clickLogin()
    cy.get('[data-test="error"]').should('be.visible')
    cy.contains('Login')
  })

  it("XSS attack", function () {
    loginPage.enterUsername('<img src="https://google.com">')
    loginPage.enterPassword('<img src="https://youtube.com">')
    loginPage.clickLogin()
    cy.get('[data-test="error"]').should('be.visible')
    cy.contains('Login')
  })
  //check notes for other possible web attacks
  ///redirect via url attack
  //symbols crash
  //mock up api call
  //wrong-wrong
  //wrong-right
  //case senstive passwords username
  //trailing spaces in user input
  //cypress paste user input
  //autocompleted test

})