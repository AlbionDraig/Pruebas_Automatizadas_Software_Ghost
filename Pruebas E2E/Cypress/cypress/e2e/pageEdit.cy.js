const { loginPage } = require("../utilities/login/login.cy");
const { logout } = require("../utilities/login/logout.cy");
const { casePageCreate } = require("../utilities/page/casePageCreate.cy");
const { casePageDelete, CasePageDelete } = require("../utilities/page/casePageDelete.cy");
const { casePageEdit } = require("../utilities/page/casePageEdit.cy");

// Parametrical variables
var url, user, password = "";
var tittle, content,tittle2, content2 = "";

describe('Scenario: Editar una pagina', () => {
    beforeEach(() => {
      Cypress.on('uncaught:exception', (err, runnable) => {
        console.error('Uncaught exception', err);
        return false;
      });
      // Obtener credenciales
      cy.fixture('credentials').then(credentials => {
          url = credentials.url;
          user = credentials.user;
          password = credentials.password;
      });
      // Obtener informacion del member
      cy.fixture('page').then(data => {
        tittle = data.tittle;
        content = data.content;
        tittle2 = data.tittle2;
        content2 = data.content2;
      });
    });
    it('Steps', () => {
        //Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
        loginPage.visit(url);
        loginPage.validatePage();
        loginPage.login(user,password);
        loginPage.validateError();
        cy.screenshot("Login", { capture: "fullPage", overwrite: true });
    
        //and Creo un nuevo pagina con "<tittle>", "<content>"
        casePageCreate.visit()
        casePageCreate.create(tittle,content)
        cy.screenshot("CreatePage", { capture: "fullPage", overwrite: true });
    
        //When Edito una pagina con "<tittle>", "<tittle2>", "<content2>"
        casePageEdit.editarPage(tittle,tittle2,content2)
        cy.screenshot("EditPage", { capture: "fullPage", overwrite: true });

        // Then Valido que se haya editado la pagina "<tittle2>"
        casePageEdit.validate(tittle2)
        
        // And Elimino la Pagina con "<tittle2>"
        casePageDelete.delete(tittle2)
        casePageDelete.validate(tittle2)
        cy.screenshot("Delete", { capture: "fullPage", overwrite: true });  
    
        //And Cierro sesion en "<url>"
        logout.visit(url)
        logout.validateError()
        cy.screenshot("Logout", { capture: "fullPage", overwrite: true });
      });
    })