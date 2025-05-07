export class LoginPage {

  username_textbox = '[data-test="username"]'
  password_textbox = '[data-test="password"]'
  login_button = '[data-test="login-button"]'

  enterUsername(username) {
    cy.get(this.username_textbox).type(username)
  }

  enterPassword(password) {
    cy.get(this.password_textbox).type(password)
  }

  clickLogin() {
    cy.get(this.login_button).click()
  }
  pasteCredentials(username, password) {
    cy.get(this.username_textbox).invoke('val', username)
    cy.get(this.password_textbox).invoke('val', password)
  }
}