export class Logout {
  constructor () {
    this.formLogin = "//form";
    this.loginButton = "//button[@type='submit']";
  }
  
  visit(url) {
    cy.visit(`${url}/ghost/#/signout/`)
  };

  validateError() {
    cy.xpath(this.formLogin).should("exist")
    cy.xpath(this.loginButton).should("be.visible")
  }
}

export const logout = new Logout();