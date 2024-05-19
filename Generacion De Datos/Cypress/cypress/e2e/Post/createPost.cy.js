// Import modules to navigate and interact
const { faker } = require("@faker-js/faker");
const { loginPage } = require("../../utilities/login/login.cy");
const { postCreate } = require("../../utilities/post/createPost.cy.js");
const { deletePost } = require("../../utilities/post/deletePost.cy.js");

// Parametrizar variables
var url, user, password;
var title, content;

describe("Scenario: Crear un nuevo Post", () => {
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
    //When Creo un nuevo Post
    postCreate.visit();
    postCreate.create(title, content);
    //Then Valido que se haya creado el Post "<memberName>"
    postCreate.validate(title);
    //And Elimino el Post creado
    deletePost.delete(title);
  });

  it("Escenario Aleatorio", () => {
    //When Creo un nuevo Post
    postCreate.visit();
    title = faker.lorem.sentence();
    content = faker.lorem.paragraphs(3);
    postCreate.create(title, content);
    //Then Valido que se haya creado el Post "<memberName>"
    postCreate.validate(title);
    //And Elimino el Post creado
    deletePost.delete(title);
  });

  it("Pool de Datos (Pseudo) Aleatorio Dinámico", () => {
    faker.seed(123)
    //When Creo un nuevo Post
    postCreate.visit();
    title = faker.lorem.sentence();
    content = faker.lorem.paragraphs(3);
    postCreate.create(title, content);
    //Then Valido que se haya creado el Post "<memberName>"
    postCreate.validate(title);
    //And Elimino el Post creado
    deletePost.delete(title);
  });
});
