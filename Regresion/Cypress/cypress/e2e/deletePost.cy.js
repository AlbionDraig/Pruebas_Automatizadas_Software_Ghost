// Import modules to navigate and interact
require('cypress-xpath');
const { loginPage } = require("../utilities/login/login.cy");
const { logout } = require("../utilities/login/logout.cy");
const { postCreate } = require("../utilities/post/createPost.cy.js");
const { deletePost } = require("../utilities/post/deletePost.cy.js");

// Parametrizar variables
var url, port, user, password;
var title, textpost;

describe("Scenario: Crear un nuevo Post", () => {
  beforeEach(() => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      console.error("Uncaught exception", err);
      return false;
    });
    // Obtener credenciales
    cy.fixture("credentials").then((credentials) => {
      url = credentials.url+':'+credentials.port;
      port = credentials.port;
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
    cy.screenshot(port+"/DeletePost"+"/Login", { capture: "fullPage", overwrite: true });

    //Amd Creo un nuevo Post
    postCreate.visit(url);
    postCreate.create(url,title, textpost);
    postCreate.validate(title);
    cy.screenshot(port+"/DeletePost"+"/CreatePost", { capture: "fullPage", overwrite: true });

    //When Elimino el Post creado
    deletePost.visit(url)
    deletePost.delete(url,title)

    //Then valido que se haya eliminado el post 
    deletePost.validate(title)

    //And Cierro sesion en "<url>"
    logout.visit(url);
    logout.validateError();
    cy.screenshot(port+"/DeletePost"+"/Logout", { capture: "fullPage", overwrite: true });
  });
});
