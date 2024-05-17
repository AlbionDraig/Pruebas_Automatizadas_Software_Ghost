// Import modules to navigate and interact
const { faker } = require("@faker-js/faker");
const { loginPage } = require("../../utilities/login/login.cy");
const { postCreate } = require("../../utilities/post/createPost.cy.js");
const { deletePost } = require("../../utilities/post/deletePost.cy.js");
const { casePostEdit } = require("../../utilities/post/editPost.cy");

// Parametrical variables
var url, user, password;
var title, content, title2, content2;

describe("Scenario: Editar una post", () => {
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
    cy.fixture("post").then((data) => {
      title = data.title;
      content = data.textPost;
      title2 = data.title2;
      content2 = data.textPost2;
    });
  });

  beforeEach(() => {
    //Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
    loginPage.visit(url);
    loginPage.validatePage();
    loginPage.login(user, password);
    loginPage.validateError();
  });

  //it("Pool de Datos A-priori", () => {});

  it("Pool de Datos (Pseudo) Aleatorio Dinámico", () => {
    //and Creo un nuevo post con "<tittle>", "<content>"
    postCreate.visit();
    title = faker.lorem.sentence();
    content = faker.lorem.paragraphs(3);
    postCreate.create(title, content);
    //When Edito una post con "<tittle>", "<tittle2>", "<content2>"
    title2 = faker.lorem.sentence();
    content2 = faker.lorem.paragraphs(3);
    casePostEdit.editarPost(title, title2, content2);
    // Then Valido que se haya editado la post "<tittle2>"
    casePostEdit.validate(title2);
    // And Elimino la Pagina con "<tittle2>"
    deletePost.delete(title2);
  });

  //it("Escenario Aleatorio", () => {});
});
