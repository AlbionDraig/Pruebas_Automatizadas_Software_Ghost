const { loginPage } = require("../../utilities/login/login.cy");
const { logout } = require("../../utilities/login/logout.cy");
const { casePageCreate } = require("../../utilities/page/createPage.cy");
const { casePageDelete } = require("../../utilities/page/deletePage.cy");
import { faker } from "@faker-js/faker";
// Parametrical variables
var url, user, password;
var title, content;
let titleFaker, descriptionFaker;

describe("Scenario: preview de una página creada", () => {
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
      title = data.tittle;
      content = data.content;
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
    //When Creo un nuevo Page con "<title>", "<content>"
    casePageCreate.visit();

    casePageCreate.previewPage(titleFaker, descriptionFaker);
    //Then Valido que se haya creado la pagina con "<title>"
    casePageCreate.validate(titleFaker);
    //And elimino el page creado "<title>"
    casePageDelete.delete(titleFaker);
    //And Cierro sesion en "<url>"
    logout.visit(url)
    logout.validateError()
  });

  


});