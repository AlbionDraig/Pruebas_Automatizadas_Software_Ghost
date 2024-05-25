const { loginPage } = require("../../utilities/login/login.cy");
const { logout } = require("../../utilities/login/logout.cy");
const { casePublishPage } = require("../../utilities/page/publishPage.cy");
const { casePageDelete } = require("../../utilities/page/deletePage.cy");
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
    it("Ejecución del escenario", () => {
        // And Creo la página
        casePublishPage.visit();
        casePublishPage.create(titleFaker,descriptionFaker);
        // When Publico la pagina
        casePublishPage.publishPage();
        casePublishPage.visit();
        // Then Ingreso a la pagina
        casePublishPage.intoPage(titleFaker);
        // Despublico la página
        casePublishPage.unpublishPage();
        //And elimino el page creado "<title>"
        casePageDelete.delete(titleFaker);
        //And Cierro sesion en "<url>"
       logout.visit(url)
       logout.validateError()
    });



});