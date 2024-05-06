export class PostDelete {
  constructor() {
    this.TagPost = "a[data-test-nav=posts]";
    this.selectPost = "a.gh-list-data.gh-post-list-title";
    this.openMenu =
      "body > div.gh-app > div > main > button > span > svg > path";
    this.deletePost = "div > div.settings-menu-content > div > button";
    this.confirmDelete = "button[data-test-task-button-state=idle]";
  }

  visit() {
    cy.get(this.TagPost).click();
  }

  delete(title) {
    cy.get("a.gh-list-data.gh-post-list-title")
      .contains(title)
      .trigger("contextmenu")
      .then(($element) => {
        cy.get('button[class="mr2"]').contains("Delete").click({ force: true });
        cy.get(".modal-content").contains("Delete").should("be.visible");
        cy.get(".gh-btn.gh-btn-red.gh-btn-icon.ember-view").click();
      });
  }

  validate() {
    cy.get(this.newPostLabel).should("not.exist");
  }
}

export const deletePost = new PostDelete();
