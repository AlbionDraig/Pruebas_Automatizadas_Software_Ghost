export class DeletePost {
    constructor () {
         this.newPostLabel = "/html/body/div[3]/div/nav[1]/div/section/div[1]/ul[2]/li[1]/a[1]";
         this.selectPost="/html/body/div[3]/div/main/section/section/div[1]/div[1]/li/a[4]/span/svg/path";
         this.lastPost="/html/body/div[3]/div/main/section/section/div[1]/div[1]";
         this.openMenu="/html/body/div[3]/div/main/button";
         this.deletePost="/html/body/div[3]/div/main/div[1]/div/div/div/div[2]/div/button"
         this.confirmDelete="/html/body/div[6]/div/div/div[2]/button[2]"
    }
    
    visit() {
      cy.get(this.newPostLabel).click()
    }
  
    deleteaPost() {
      cy.get(this.selectPost).click()
      cy.get(this.lastPost).click()
      cy.get(this.openMenu).click()
      cy.get(this.deletePost).click()
      cy.get(this.confirmDelete).click()  
    }
    validate() {
        cy.get(this.newPostLabel).should('not.exist')
      }
    
    }
    
 //   export const DeletePost = new DeletePost(); 