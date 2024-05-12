require('cypress-xpath');
const { loginPage } = require("../utilities/login/login.cy");
const { logout } = require("../utilities/login/logout.cy");
const { casePageCreate } = require("../utilities/page/casePageCreate.cy");
const { casePageDelete, CasePageDelete } = require("../utilities/page/casePageDelete.cy");
const { casePageEdit } = require("../utilities/page/casePageEdit.cy");

// Parametrical variables
var url, port, user, password;
var title, content,title2, content2;

describe('Scenario: Editar una pagina', () => {
    beforeEach(() => {
      Cypress.on('uncaught:exception', (err, runnable) => {
        console.error('Uncaught exception', err);
        return false;
      });
      // Obtener credenciales
      cy.fixture('credentials').then(credentials => {
          url = credentials.url+':'+credentials.port;
          port = credentials.port;
          user = credentials.user;
          password = credentials.password;
      });
      // Obtener informacion del member
      cy.fixture('page').then(data => {
        title = data.title;
        content = data.content;
        title2 = data.title2;
        content2 = data.content2;
      });
    });
    it('Steps', () => {
        //Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
        loginPage.visit(url);
        loginPage.validatePage();
        loginPage.login(user,password);
        loginPage.validateError();
        cy.screenshot(port+"/EditPage"+"/Login", { capture: "fullPage", overwrite: true });
    
        //and Creo un nuevo pagina con "<title>", "<content>"
        casePageCreate.visit(url)
        casePageCreate.create(url,title,content)
        cy.screenshot(port+"/EditPage"+"/CreatePage", { capture: "fullPage", overwrite: true });
    
        //When Edito una pagina con "<title>", "<title2>", "<content2>"
        casePageEdit.editarPage(url,title,title2,content2)
        cy.screenshot(port+"/EditPage"+"/EditPage", { capture: "fullPage", overwrite: true });

        // Then Valido que se haya editado la pagina "<title2>"
        casePageEdit.validate(title2)
        
        // And Elimino la Pagina con "<title2>"
        casePageDelete.delete(url,title2)
        casePageDelete.validate(title2)
        cy.screenshot(port+"/EditPage"+"/Delete", { capture: "fullPage", overwrite: true });  
    
        //And Cierro sesion en "<url>"
        logout.visit(url)
        logout.validateError()
        cy.screenshot(port+"/EditPage"+"/Logout", { capture: "fullPage", overwrite: true });
      });
    })