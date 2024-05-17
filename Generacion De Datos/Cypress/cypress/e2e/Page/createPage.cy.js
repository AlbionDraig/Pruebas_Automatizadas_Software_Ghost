// Import modules to navigate and interact
const { faker } = require("@faker-js/faker");
const { loginPage } = require("../../utilities/login/login.cy");
const { casePageCreate } = require("../../utilities/page/createPage.cy");
const { casePageDelete } = require("../../utilities/page/deletePage.cy");

// Parametrical variables
var url, user, password;
var title, content;

describe("Scenario: Crear new Page", () => {
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
      title = data.title;
      content = data.content;
    });
  });

  beforeEach(() => {
    //Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
    loginPage.visit(url);
    loginPage.validatePage();
    loginPage.login(user, password);
    loginPage.validateError();
  });

  it("Pool de Datos A-priori", () => {});

  it("Pool de Datos (Pseudo) Aleatorio Dinámico", () => {
    //When Creo un nuevo Page con "<title>", "<content>"
    casePageCreate.visit();
    title = faker.lorem.sentence();
    content = faker.lorem.paragraphs(3);
    casePageCreate.create(title, content);
    //Then Valido que se haya creado la pagina con "<title>"
    casePageCreate.validate(title);
    //And elimino el page creado "<title>"
    casePageDelete.delete(title);
  });

  it("Escenario Aleatorio", () => {});
});
