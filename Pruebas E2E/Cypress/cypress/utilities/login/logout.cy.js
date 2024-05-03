export class Logout {
  constructor () {
    this.formLogin = "#login";
    this.loginButton = "button[data-test-button=sign-in]";
  }
  
  visit(url) {
    cy.visit(`${url}/ghost/#/signout/`)
  };

  validateError() {
    cy.get(this.formLogin).should("exist")
    cy.get(this.loginButton).should("be.visible")
  }
}

export const logout = new Logout();