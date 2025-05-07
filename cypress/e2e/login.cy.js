import { LoginPage } from "./pages/login"

const loginPage = new LoginPage()

//Test that assures the Login page is reachable and contains all the 
//nessesary attributes for the user to login as input fields and login buttons.
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
  //Access the link before each test to ensure independent
  //testing of each scenario
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
  it("Url check for sensetive data", function () {
    loginPage.enterUsername('standard_user')
    loginPage.enterPassword('secret_sauce')
    loginPage.clickLogin()
    cy.url().should('include', '/inventory')
    cy.url().should('not.include', 'password')
    cy.url().should('not.include', 'username')
    cy.url().should('not.match', /[?&]password=.*|[?&]token=.*/i)
  })
  it("Invalid username login", function () {
    loginPage.enterUsername('Admin123')
    loginPage.enterPassword('secret_sauce')
    loginPage.clickLogin()
    cy.get('[data-test="error"]').should('be.visible').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    cy.contains('Login')
  })
  it("Invalid password login", function () {
    loginPage.enterUsername('standard_user')
    loginPage.enterPassword('admin123')
    loginPage.clickLogin()
    cy.get('[data-test="error"]').should('be.visible').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    cy.contains('Login')
  })
  it("Invalid credentials login", function () {
    loginPage.enterUsername('Admin123')
    loginPage.enterPassword('admin123')
    loginPage.clickLogin()
    cy.get('[data-test="error"]').should('be.visible').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    cy.contains('Login')
  })
  it("Empty credentials", function () {
    loginPage.enterUsername(' ')
    loginPage.enterPassword(' ')
    loginPage.clickLogin()
    cy.get('[data-test="error"]').should('be.visible').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    cy.contains('Login')
  })
  it("Empty username", function () {
    loginPage.enterUsername(' ')
    loginPage.enterPassword('secret_sauce')
    loginPage.clickLogin()
    cy.get('[data-test="error"]').should('be.visible').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    cy.contains('Login')
  })
  it("Empty password", function () {
    loginPage.enterUsername('standard_user')
    loginPage.enterPassword(' ')
    loginPage.clickLogin()
    cy.get('[data-test="error"]').should('be.visible').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    cy.contains('Login')
  })
  //Edge cases for user credentials validation
  //good to check that none of these break user interface
  //and error messges to not reveal any sensetive information
  it("Trailing spaces on the back", function () {
    loginPage.enterUsername('standard_user  ')
    loginPage.enterPassword('secret_sauce   ')
    loginPage.clickLogin()
    cy.get('[data-test="error"').should('be.visible').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    cy.contains('Login')
  })
  it("Trailing spaces on the front", function () {
    loginPage.enterUsername('  standard_user')
    loginPage.enterPassword(' secret_sauce')
    loginPage.clickLogin()
    cy.get('[data-test="error"').should('be.visible').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    cy.contains('Login')
  })
  it("Capitalised fisrt letter case username", function () {
    loginPage.enterUsername('Standard_user')
    loginPage.enterPassword('secret_sauce')
    loginPage.clickLogin()
    cy.get('[data-test="error"').should('be.visible').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    cy.contains('Login')
  })
  it("Capitalised first letter case password", function () {
    loginPage.enterUsername('standard_user')
    loginPage.enterPassword('Secret_sauce')
    loginPage.clickLogin()
    cy.get('[data-test="error"').should('be.visible').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    cy.contains('Login')
  })
  it("Capitalised case username", function () {
    loginPage.enterUsername('STANDARD_USER')
    loginPage.enterPassword('secret_sauce')
    loginPage.clickLogin()
    cy.get('[data-test="error"').should('be.visible').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    cy.contains('Login')
  })
  it("Capitalised case password", function () {
    loginPage.enterUsername('standard_user')
    loginPage.enterPassword('SECRET_SAUCE')
    loginPage.clickLogin()
    cy.get('[data-test="error"').should('be.visible').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    cy.contains('Login')
  })
  it("Number at the end of username edge case", function () {
    loginPage.enterUsername('standard_user2')
    loginPage.enterPassword('secret_sauce')
    loginPage.clickLogin()
    cy.get('[data-test="error"').should('be.visible').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    cy.contains('Login')
  })
  it("Number at the end of password edge case", function () {
    loginPage.enterUsername('standard_user')
    loginPage.enterPassword('secret_sauce1')
    loginPage.clickLogin()
    cy.get('[data-test="error"').should('be.visible').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    cy.contains('Login')
  })
  it("Symbol at the end of username edge case", function () {
    loginPage.enterUsername('standard_user!')
    loginPage.enterPassword('secret_sauce')
    loginPage.clickLogin()
    cy.get('[data-test="error"').should('be.visible').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    cy.contains('Login')
  })
  it("Symbol at the end of password edge case", function () {
    loginPage.enterUsername('standard_user')
    loginPage.enterPassword('secret_sauce!')
    loginPage.clickLogin()
    cy.get('[data-test="error"').should('be.visible').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    cy.contains('Login')
  })
})

//Although we cannot ensure that majority
//of edge cases below did not cause any internal problems
//at least we cover basics to ensure that they do not crash the server
describe("Security checks for the login functionality", function () {
  beforeEach(function () {
    cy.visit('https://www.saucedemo.com/')
    cy.get('.error-message-container').should('contain', '')
  })
  it("Overly long user input", function () {
    loginPage.enterUsername('standard_userstandard_userstandard_userstandard_userstandard_userstandard_user')
    loginPage.enterPassword('secret_sauceecret_sauceecret_sauceecret_sauceecret_sauceecret_sauceecret_sauce')
    loginPage.clickLogin()
    cy.get('[data-test="error"]').should('be.visible').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    cy.contains('Login')
  })
  it("Double valid username edge case", function () {
    loginPage.enterUsername('standard_user; standard_user')
    loginPage.enterPassword('secret_sauce')
    loginPage.clickLogin()
    cy.get('[data-test="error"').should('be.visible').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    cy.contains('Login')
  })
  it("Double valid password edge case", function () {
    loginPage.enterUsername('standard_user')
    loginPage.enterPassword('secret_sauce; secret_sauce')
    loginPage.clickLogin()
    cy.get('[data-test="error"').should('be.visible').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    cy.contains('Login')
  })
  it("SQL injection password", function () {
    loginPage.enterUsername('standard_user')
    loginPage.enterPassword('21&apos; OR 1=1-- ')
    loginPage.clickLogin()
    cy.get('[data-test="error"]').should('be.visible').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    cy.contains('Login')
  })
  it("SQL injection username", function () {
    loginPage.enterUsername('&apos; OR 1=1--')
    loginPage.enterPassword('secret_sauce')
    loginPage.clickLogin()
    cy.get('[data-test="error"]').should('be.visible').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    cy.contains('Login')
  })
  it("Javascript injection", function () {
    loginPage.enterUsername('<script>alert(2)</script>')
    loginPage.enterPassword('<script>alert(1)</script>')
    loginPage.clickLogin()
    cy.get('[data-test="error"]').should('be.visible').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    cy.contains('Login')
  })
  it("XSS attack", function () {
    loginPage.enterUsername('<img src="https://google.com">')
    loginPage.enterPassword('<img src="https://youtube.com">')
    loginPage.clickLogin()
    cy.get('[data-test="error"]').should('be.visible').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    cy.contains('Login')
  })
})