const { loginPage } = require("../../utilities/login/login.cy");
const { casePageCreate } = require("../../utilities/page/createPage.cy");
import { faker } from "@faker-js/faker";


var url, user, password;
var title, content;
let titleFaker, descriptionFaker;

describe("Scenario: publish de una página creada", () => {
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
        title = data.tittlePusblish;
        content = data.contentPublish;
      });
      titleFaker = faker.person.jobTitle();
      descriptionFaker = faker.lorem.paragraph();
    });
    beforeEach(() => {
      //Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
      loginPage.visit(url);
      loginPage.validatePage();
      loginPage.login(user, password);
      loginPage.validateError();
    });
    it("Pool de Datos A-priori", () => {
        //When Creo un nuevo Page con "<title>", "<content>"
        casePageCreate.visit();
    
        casePageCreate.publishPage(title, content);
    });
    it("Pool de Datos (Pseudo) Aleatorio Dinámico", () => {
        //When Creo un nuevo Page con "<title>", "<content>"
        casePageCreate.visit();
    
        casePageCreate.publishPage(titleFaker, descriptionFaker);
    });


});