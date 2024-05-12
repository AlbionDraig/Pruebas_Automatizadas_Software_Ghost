export class LoginPage {
  constructor () {
    this.formLogin = "//form";
    this.userInput = "//input[@type='email']";
    this.passwordInput = "//input[@type='password']";
    this.loginButton = "//button[@type='submit']";
    this.dashboard = "//header[@class='gh-nav-menu']";
  }
  
  visit(url) {
    cy.visit(`${url}/ghost/#/signout/`)
    cy.visit(`${url}/ghost/`)
  };

  validatePage() {
    cy.xpath(this.formLogin).should("exist")
    cy.xpath(this.loginButton).should("be.visible")
  };

  login(user, password) {
    cy.xpath(this.userInput).type(`${user}`);
    cy.xpath(this.passwordInput).type(`${password}`)
    cy.xpath(this.loginButton).click()
  }

  validateError() {
    cy.xpath(this.dashboard).should("be.visible");
  }
}

export const loginPage = new LoginPage();