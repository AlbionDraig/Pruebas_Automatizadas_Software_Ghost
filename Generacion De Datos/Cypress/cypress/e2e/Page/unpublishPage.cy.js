const { loginPage } = require("../../utilities/login/login.cy");
const { casePublishPage } = require("../../utilities/page/publishPage.cy");
import { faker } from "@faker-js/faker";

var url, user, password;
var title, content;
let titleFaker, descriptionFaker;
describe("Scenario: publish de una pagina y luego despublicar la página", () => {
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
        title = data.tittleUnPusblish;
        content = data.contentUnPublish;
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

        casePublishPage.intoPage(titleFaker);

        casePublishPage.unpublishPage();
    });
    it("Pool de Datos (Pseudo) Aleatorio Dinámico", () => {
        
        casePublishPage.visit();

        casePublishPage.create(titleFaker,descriptionFaker);

        casePublishPage.publishPage();

        casePublishPage.visit();

        casePublishPage.intoPage(titleFaker);

        casePublishPage.unpublishPage();
    });



});