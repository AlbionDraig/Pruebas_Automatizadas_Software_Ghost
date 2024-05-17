export class MenberEdit {
  constructor() {
    this.tagLabel = "a[data-test-nav=members]";
    this.nameField = "#member-name";
    this.emailField = "input[name=email][type=text]";
    this.noteField = "textarea[name=note][data-test-input=member-note]";
    this.saveButton = "button[data-test-button=save]";
    this.nameLabel = "tr[data-test-list='members-list-item']";
    this.error = "div.form-group.max-width.error > p";
    this.accept = "div.modal-footer > button.gh-btn.gh-btn-red";
  }

  visit() {
    cy.get(this.tagLabel).click();
  }

  edit(oldName, name, email, note) {
    cy.get(this.nameLabel).contains(oldName).click();
    cy.get(this.nameField).clear().type(name);
    cy.get(this.emailField).clear().type(email);
    cy.get(this.noteField).clear().type(note);
    cy.get(this.saveButton).click();
    cy.wait(5000)
  }

  acceptChanges() {
    cy.get(this.accept).click();
  }

  validate(name) {
    cy.get(this.nameLabel).contains(name).should("exist");
  }

  validateError() {
    cy.get(this.error).should("be.visible");
  }
}

export const memberEdit = new MenberEdit();
