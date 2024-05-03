export class MenberCreate {
  constructor () {
    this.tagLabel = "a[data-test-nav=members]";
    this.newMenberButton = "a.ember-view.gh-btn.gh-btn-primary";
    this.nameField = "#member-name";
    this.emailField = "input[name=email][type=text]";
    this.noteField = "textarea[name=note][data-test-input=member-note]";
    this.saveButton = "button[data-test-button=save]";
    this.nameLabel = "a[data-test-table-data=details] > div > div > h3";
  }
  
  visit() {
    cy.get(this.tagLabel).click()
  }

  create(name,email,note) {
    cy.get(this.newMenberButton).click()
    cy.get(this.nameField).type(name)
    cy.get(this.emailField).type(email)
    cy.get(this.noteField).type(note)
    cy.get(this.saveButton).click()
    this.visit()
  }

  validate(name) {
    cy.get(this.nameLabel)
    .invoke('text')
    .then(text => {
      if (!text.includes(name)) {
        throw new Error(`El texto no contiene ${name}`);
      }
    });
  }

}

export const memberCreate = new MenberCreate();