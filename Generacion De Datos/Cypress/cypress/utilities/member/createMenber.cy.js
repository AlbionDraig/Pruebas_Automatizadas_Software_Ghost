export class MenberCreate {
  constructor() {
    this.tagLabel = "a[data-test-nav=members]";
    this.newMenberButton = "a.ember-view.gh-btn.gh-btn-primary";
    this.nameField = "#member-name";
    this.emailField = "input[name=email][type=text]";
    this.noteField = "textarea[name=note][data-test-input=member-note]";
    this.saveButton = "button[data-test-button=save]";
    this.nameLabel = "tr[data-test-list='members-list-item']";
    this.error = "div.form-group.max-width.error > p";
  }

  visit() {
    cy.get(this.tagLabel).click();
  }

  create(name, email, note) {
    cy.get(this.newMenberButton).click();
    cy.get(this.nameField).type(name);
    cy.get(this.emailField).type(email);
    cy.get(this.noteField).type(note);
    cy.get(this.saveButton).click();
    cy.wait(5000)
  }

  validate(name) {
    cy.get(this.nameLabel).contains(name).should("exist");
  }

  validateError() {
    cy.get(this.error).should("be.visible");
  }
}

export const memberCreate = new MenberCreate();
