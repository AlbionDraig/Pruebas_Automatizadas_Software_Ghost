// Import modules to navigate and interact
const { faker } = require("@faker-js/faker");
const { loginPage } = require("../../utilities/login/login.cy");
const { postCreate } = require("../../utilities/post/createPost.cy.js");
const { deletePost } = require("../../utilities/post/deletePost.cy.js");
const { postPublish } = require("../../utilities/post/publishPost.cy.js");

// Parametrizar variables
var url, user, password;
var title, content, date, time, rawDate;

describe("Scenario: Crear un nuevo Post Programado", () => {
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
    // Obtener informacion del post
    cy.fixture("post").then((data) => {
      title = data.title;
      content = data.textPost;
      date = data.date;
      time = data.time;
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
    //And Creo un nuevo Post
    postCreate.visit();
    postCreate.create(title, content);
    //When creo un scheduled post
    postPublish.create(title, date, time);
    //Then Valido que se programado el post
    postPublish.visitScheduled();
    postPublish.validate(title);
    //And Elimino el Post creado
    deletePost.delete(title);
  });

  it("Escenario Aleatorio", () => {
    //And Creo un nuevo Post
    postCreate.visit();
    title = faker.lorem.sentence();
    content = faker.lorem.paragraphs(3);
    postCreate.create(title, content);
    //When creo un scheduled post
    rawDate = faker.date.future()
    date = rawDate.toISOString().split('T')[0];
    time = `${String(rawDate.getHours()).padStart(2, '0')}:${String(rawDate.getMinutes()).padStart(2, '0')}`;
    postPublish.create(title, date, time);
    //Then Valido que se programado el post
    postPublish.visitScheduled();
    postPublish.validate(title);
    //And Elimino el Post creado
    deletePost.delete(title);
  });

  it("Pool de Datos (Pseudo) Aleatorio Dinámico", () => {
    faker.seed(123)
    //And Creo un nuevo Post
    postCreate.visit();
    title = faker.lorem.sentence();
    content = faker.lorem.paragraphs(3);
    postCreate.create(title, content);
    //When creo un scheduled post
    rawDate = faker.date.future()
    date = rawDate.toISOString().split('T')[0];
    time = `${String(rawDate.getHours()).padStart(2, '0')}:${String(rawDate.getMinutes()).padStart(2, '0')}`;
    postPublish.create(title, date, time);
    //Then Valido que se programado el post
    postPublish.visitScheduled();
    postPublish.validate(title);
    //And Elimino el Post creado
    deletePost.delete(title);
  });
});
