const { loginPage } = require("../../utilities/login/login.cy");
const { logout } = require("../../utilities/login/logout.cy");
const { casePageCreate } = require("../../utilities/page/createPage.cy");
const { casePageDelete } = require("../../utilities/page/deletePage.cy");
import { faker } from "@faker-js/faker";

var url, user, password;
var title, content;
let titleFaker, descriptionFaker;

describe("Scenario:Crear una página con titulo muy largo", () => {
    before(() => {
      Cypress.on("uncaught:exception", (err, runnable) => {
        console.error("Uncaught exception", err);
        return false;
      });
      // Obtener credenciales
      cy.fixture("credentials").then((credentials) => {
        url = credentials.url;
        user = credentials.user;
        password = credentials.password;
      });
      // Obtener informacion del member
      cy.fixture("page").then((data) => {
        title = data.bigTittle;
        content = data.contentBigTittle;
      });
      titleFaker = generateJobTitle(200);
      descriptionFaker = faker.lorem.paragraph(3);
    });
    beforeEach(() => {
      //Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
      loginPage.visit(url);
      loginPage.validatePage();
      loginPage.login(user, password);
      loginPage.validateError();
    });
    
    it("Pool de Datos A-priori", () => {
        //When Creo un nuevo Page con titulo grande con "<title>", "<content>"
        casePageCreate.visit();
        casePageCreate.createPageBigTittle(title, content);
        //Then Valido que se haya creado la pagina con "<title>"
        casePageCreate.validate(title);
        //And elimino el page creado "<title>"
        casePageDelete.delete(title);
        //And Cierro sesion en "<url>"
        logout.visit(url);
        logout.validateError();
      });

    it("Pool de Datos (Pseudo) Aleatorio Dinámico", () => {
        //When Creo un nuevo Page con titulo grande con "<title>", "<content>"
        casePageCreate.visit();
        casePageCreate.createPageBigTittle(titleFaker, descriptionFaker);
        //Then Valido que se haya creado la pagina con "<title>"
        casePageCreate.validate(titleFaker);
        //And elimino el page creado "<title>"
        casePageDelete.delete(titleFaker);
        //And Cierro sesion en "<url>"
        logout.visit(url);
        logout.validateError();
      });
      it("Escenario Aleatorio", () => {
        //When Creo un nuevo Page con titulo grande con "<title>", "<content>"
        casePageCreate.visit();
        casePageCreate.createPageBigTittle(titleFaker, descriptionFaker);
        //Then Valido que se haya creado la pagina con "<title>"
        casePageCreate.validate(titleFaker);
        //And elimino el page creado "<title>"
        casePageDelete.delete(titleFaker);
      });


});

function generateJobTitle(charCount) {
    let title = '';
    while (title.length < charCount) {
      title += faker.person.jobTitle() + ' ';
    }
    // Asegura que el título sea exactamente de charCount caracteres
    return title.substring(0, charCount).trim();
  }