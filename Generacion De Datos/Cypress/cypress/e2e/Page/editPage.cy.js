// Import modules to navigate and interact
const { faker } = require("@faker-js/faker");
const { loginPage } = require("../../utilities/login/login.cy");
const { casePageCreate } = require("../../utilities/page/createPage.cy");
const { casePageDelete } = require("../../utilities/page/deletePage.cy");
const { casePageEdit } = require("../../utilities/page/editPage.cy");

// Parametrical variables
var url, user, password;
var title, content, title2, content2;

describe("Scenario: Editar una pagina", () => {
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
      title2 = data.tittle2;
      content2 = data.content2;
    });
  });

  beforeEach(() => {
    //Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
    loginPage.visit(url);
    loginPage.validatePage();
    loginPage.login(user, password);
    loginPage.validateError();
  });

  it("Pool de Datos A-priori", () => {
    //and Creo un nuevo pagina con "<title>", "<content>"
    casePageCreate.visit();
    casePageCreate.create(title, content);
    //When Edito una pagina con "<title>", "<title2>", "<content2>"
    casePageEdit.editarPage(title, title2, content2);
    // Then Valido que se haya editado la pagina "<title2>"
    casePageEdit.validate(title2);
    // And Elimino la Pagina con "<title2>"
    casePageDelete.delete(title2);
  });

  it("Escenario Aleatorio", () => {
    //and Creo un nuevo pagina con "<title>", "<content>"
    casePageCreate.visit();
    title = faker.lorem.sentence();
    content = faker.lorem.paragraphs(3);
    casePageCreate.create(title, content);
    //When Edito una pagina con "<title>", "<title2>", "<content2>"
    title2 = faker.lorem.sentence();
    content2 = faker.lorem.paragraphs(3);
    casePageEdit.editarPage(title, title2, content2);
    // Then Valido que se haya editado la pagina "<title2>"
    casePageEdit.validate(title2);
    // And Elimino la Pagina con "<title2>"
    casePageDelete.delete(title2);
  });

  it("Pool de Datos (Pseudo) Aleatorio Dinámico", () => {
    faker.seed(123)
    //and Creo un nuevo pagina con "<title>", "<content>"
    casePageCreate.visit();
    title = faker.lorem.sentence();
    content = faker.lorem.paragraphs(3);
    casePageCreate.create(title, content);
    //When Edito una pagina con "<title>", "<title2>", "<content2>"
    title2 = faker.lorem.sentence();
    content2 = faker.lorem.paragraphs(3);
    casePageEdit.editarPage(title, title2, content2);
    // Then Valido que se haya editado la pagina "<title2>"
    casePageEdit.validate(title2);
    // And Elimino la Pagina con "<title2>"
    casePageDelete.delete(title2);
  });
});
