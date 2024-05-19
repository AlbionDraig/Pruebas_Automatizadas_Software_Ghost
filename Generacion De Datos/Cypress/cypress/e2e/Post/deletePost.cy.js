// Import modules to navigate and interact
const { loginPage } = require("../../utilities/login/login.cy");
const { logout } = require("../../utilities/login/logout.cy");
const { postCreate } = require("../../utilities/post/createPost.cy");
const { deletePost } = require("../../utilities/post/deletePost.cy");
import { faker } from "@faker-js/faker";

// Parametrizar variables
var url, user, password;
var title, textpost;
let titleFaker, descriptionFaker;
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
      textpost = data.textPost;
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

    //Amd Creo un nuevo Post
    postCreate.visit();
    postCreate.create(title, textpost);
    postCreate.validate(title);

    //When Elimino el Post creado
    deletePost.visit()
    deletePost.delete(title)

    //Then valido que se haya eliminado el post 
    deletePost.validate(title)

    //And Cierro sesion en "<url>"
    logout.visit(url);
    logout.validateError();
  });
  it("Pool de Datos (Pseudo) Aleatorio Dinámico", () => {

    //Amd Creo un nuevo Post
    postCreate.visit();
    postCreate.create(titleFaker, descriptionFaker);
    postCreate.validate(titleFaker);

    //When Elimino el Post creado
    deletePost.visit()
    deletePost.delete(titleFaker)

    //Then valido que se haya eliminado el post 
    deletePost.validate(titleFaker)

    //And Cierro sesion en "<url>"
    logout.visit(url);
    logout.validateError();
  });
  it("Escenario Aleatorio", () => {
    titleFaker = faker.person.jobTitle();
    descriptionFaker = faker.lorem.paragraph();

    //Amd Creo un nuevo Post
    postCreate.visit();
    postCreate.create(titleFaker, descriptionFaker);
    postCreate.validate(titleFaker);

    //When Elimino el Post creado
    deletePost.visit()
    deletePost.delete(titleFaker)

    //Then valido que se haya eliminado el post 
    deletePost.validate(titleFaker)
  });
});
