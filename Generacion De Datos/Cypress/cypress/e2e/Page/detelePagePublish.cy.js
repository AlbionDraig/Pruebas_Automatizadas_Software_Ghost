const { loginPage } = require("../../utilities/login/login.cy");
const { casePublishPage } = require("../../utilities/page/publishPage.cy");
const { casePageDelete } = require("../../utilities/page/deletePage.cy");
import { faker } from "@faker-js/faker";

var url, user, password;
var title, content;
let titleFaker, descriptionFaker;

describe("Scenario:Publicar página para luego ser eliminada", () => {
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
        title = data.tittleDeletePusblish;
        content = data.contentDeletePublish;
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
        
        casePublishPage.visit();

        casePublishPage.create(title,content);

        casePublishPage.publishPage();

        casePublishPage.visit();

        casePageDelete.delete(title);

        casePageDelete.validate(title);
    });
    it("Pool de Datos (Pseudo) Aleatorio Dinámico", () => {
        
        casePublishPage.visit();

        casePublishPage.create(titleFaker,descriptionFaker);

        casePublishPage.publishPage();

        casePublishPage.visit();

        casePageDelete.delete(titleFaker);

        casePageDelete.validate(titleFaker);
    });    
});