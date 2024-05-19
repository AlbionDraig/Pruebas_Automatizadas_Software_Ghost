const { loginPage } = require("../../utilities/login/login.cy");
const { logout } = require("../../utilities/login/logout.cy");
const { casePageCreate } = require("../../utilities/page/createPage.cy");
const { casePageDelete } = require("../../utilities/page/deletePage.cy");
import { faker } from "@faker-js/faker";

// Parametrical variables
var url, user, password = "";
var tittle, content = "";
let titleFaker, descriptionFaker;

describe('Scenario: Eliminar una página', () => {
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
      });
      titleFaker = faker.person.jobTitle();
      descriptionFaker = faker.lorem.paragraph();
    });
    it("Pool de Datos A-priori", () => {
       //Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
       loginPage.visit(url);
       loginPage.validatePage();
       loginPage.login(user,password);
       loginPage.validateError();
   
       //And Creo un nuevo Page con "<tittle>", "<content>"
       casePageCreate.visit()
       casePageCreate.create(tittle,content)
   
       // when Delete page con "<tittle>"
       casePageDelete.delete(tittle)
       
       // Then Validar la pagina eliminada con "<tittle>"
       casePageDelete.validate(tittle)
   
       //And Cierro sesion en "<url>"
       logout.visit(url)
       logout.validateError()
    });
    it('Pool de Datos (Pseudo) Aleatorio Dinámico', () => {
        //Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
        loginPage.visit(url);
        loginPage.validatePage();
        loginPage.login(user,password);
        loginPage.validateError();
    
        //And Creo un nuevo Page con "<tittle>", "<content>"
        casePageCreate.visit()
        casePageCreate.create(titleFaker,descriptionFaker)
    
        // when Delete page con "<tittle>"
        casePageDelete.delete(titleFaker)
        
        // Then Validar la pagina eliminada con "<tittle>"
        casePageDelete.validate(titleFaker)
    
        //And Cierro sesion en "<url>"
        logout.visit(url)
        logout.validateError()
      });
    })