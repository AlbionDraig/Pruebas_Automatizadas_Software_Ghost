export class LoginPage {
  constructor () {
    this.formLogin = "#login";
    this.userInput = "input[id=identification]";
    this.passwordInput = "input[id=password]";
    this.loginButton = "button[data-test-button=sign-in]";
    this.dashboard = "a[title=Dashboard]";
  }
  
  visit(url) {
    cy.visit(`${url}/ghost/#/signout/`)
    cy.visit(`${url}/ghost/`)
  };

  validatePage() {
    cy.get(this.formLogin).should("exist")
    cy.get(this.loginButton).should("be.visible")
  };

  login(user, password) {
    cy.get(this.userInput).type(`${user}`);
    cy.get(this.passwordInput).type(`${password}`)
    cy.get(this.loginButton).click()
  }

  validateError() {
    cy.get(this.dashboard).should("be.visible");
  }
}

export const loginPage = new LoginPage();