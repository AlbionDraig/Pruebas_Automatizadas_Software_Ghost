export class LoginPage {
  constructor () {
    this.formLogin = "#login";
    this.userInput = "input[id=identification]";
    this.passwordInput = "input[id=password]";
    this.loginButton = "button[data-test-button=sign-in]";
    this.dashboard = "a[title=Dashboard]";
    this.errorMessage = "p.main-error";
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
    cy.get(this.dashboard).should("be.visible")
  } 
  
  validateErrorMessageUser() {
    cy.get(this.errorMessage)
      .should("be.visible")
      .contains("There is no user with that email address")
      /*
      .and(($el) => {
        expect($el.text().trim()).to.not.be.empty;
      });
      */
  }
  
  validateErrorMessagePassword() {
    cy.get(this.errorMessage)
      .should("be.visible")
      .contains("Your password is incorrect")
  }
}

export const loginPage = new LoginPage();