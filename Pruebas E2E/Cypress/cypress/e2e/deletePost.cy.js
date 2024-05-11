// Import modules to navigate and interact
const { loginPage } = require("../utilities/login/login.cy");
const { logout } = require("../utilities/login/logout.cy");
const { postCreate } = require("../utilities/post/createPost.cy.js");
const { deletePost } = require("../utilities/post/deletePost.cy.js");

// Parametrizar variables
var url, user, password;
var title, textpost;

describe("Scenario: Crear un nuevo Post", () => {
  beforeEach(() => {
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
  });

  it("Steps", () => {
    //Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
    loginPage.visit(url);
    loginPage.validatePage();
    loginPage.login(user, password);
    loginPage.validateError();

    //Amd Creo un nuevo Post
    postCreate.visit();
    postCreate.create(title, textpost);
    postCreate.validate(title);

    //When Elimino el Post creado
    deletePost.visit()
    deletePost.delete(title)

    //Then valido que se haya eliminado el post 
    deletePost.validate()

    //And Cierro sesion en "<url>"
    logout.visit(url);
    logout.validateError();
  });
});
