export class CasePageDelete {
  constructor() {
    this.tagLabelPage = "a[data-test-nav=pages]";
    this.newPageButtonPage =
      "a.ember-view.gh-btn.gh-btn-primary.view-actions-top-row";
    this.tittlePage = "textarea[data-test-editor-title-input]";
    this.contentPage = "p[data-koenig-dnd-droppable=true]";
    this.previewButton = "button[data-test-button=publish-preview]";
  }

  visit() {
    cy.get(this.tagLabelPage).click();
  }

  delete(tittle) {
    cy.get("a.gh-list-data.gh-post-list-title")
      .contains(tittle)
      .trigger("contextmenu")
      .then(($element) => {
        cy.get('button[class="mr2"]').contains("Delete").click({ force: true });

        cy.get(".modal-content").contains("Delete").should("be.visible");

        cy.get(".gh-btn.gh-btn-red.gh-btn-icon.ember-view").click();
      });

    this.visit();
  }

  validate(tittle) {
    cy.get("section > section")
      .contains(tittle)
      .should("not.exist");
  }
}

export const casePageDelete = new CasePageDelete();
