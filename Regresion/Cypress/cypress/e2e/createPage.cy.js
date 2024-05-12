require('cypress-xpath');
const { loginPage } = require("../utilities/login/login.cy");
const { logout } = require("../utilities/login/logout.cy");
const { casePageCreate } = require("../utilities/page/casePageCreate.cy");
const { casePageDelete } = require("../utilities/page/casePageDelete.cy");

// Parametrical variables
var url, port, user, password;
var title, content;

describe('Scenario: Crear new Page', () => {
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
      });
    });
    it('Steps', () => {
        //Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
        loginPage.visit(url);
        loginPage.validatePage();
        loginPage.login(user,password);
        loginPage.validateError();
        cy.screenshot(port+"/CreatePage"+"/Login", { capture: "fullPage", overwrite: true });
    
        //When Creo un nuevo Page con "<title>", "<content>"
        casePageCreate.visit(url)
        casePageCreate.create(url,title,content)
        cy.screenshot(port+"/CreatePage"+"/CreatePage", { capture: "fullPage", overwrite: true });
    
        //Then Valido que se haya creado la pagina con "<title>"
        casePageCreate.validate(title)

        //And elimino el page creado "<title>"
        casePageDelete.visit(url) 
        casePageDelete.delete(url,title) 
        casePageDelete.validate(title) 
        cy.screenshot(port+"/CreatePage"+"/DeletePage", { capture: "fullPage", overwrite: true });  
    
        //And Cierro sesion en "<url>"
        logout.visit(url)
        logout.validateError()
        cy.screenshot(port+"/CreatePage"+"/Logout", { capture: "fullPage", overwrite: true });
      });
    
    })
