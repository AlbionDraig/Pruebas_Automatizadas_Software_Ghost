// Import modules to navigate and interact
require('cypress-xpath');
const { loginPage } = require("../utilities/login/login.cy");
const { logout } = require("../utilities/login/logout.cy");
const { postCreate } = require("../utilities/post/createPost.cy.js");
const { deletePost } = require("../utilities/post/deletePost.cy.js");

// Parametrizar variables
var url, port, user, password;
var title, textPost;

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
      textPost = data.textPost;
    });
  });

  it("Steps", () => {
    //Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
    loginPage.visit(url);
    loginPage.validatePage();
    loginPage.login(user, password);
    loginPage.validateError();
    cy.screenshot(port+"/CreatePost"+"/Login", { capture: "fullPage", overwrite: true });

    //When Creo un nuevo Post
    postCreate.visit(url);
    postCreate.create(url,title, textPost);
    cy.screenshot(port+"/CreatePost"+"/CreatePost", { capture: "fullPage", overwrite: true });

    //Then Valido que se haya creado el Member "<memberName>"
    postCreate.validate(title);

    //And Elimino el Post creado
    deletePost.visit(url)
    deletePost.delete(url,title)
    cy.screenshot(port+"/CreatePost"+"/DeletePost", { capture: "fullPage", overwrite: true });

    //And Cierro sesion en "<url>"
    logout.visit(url);
    logout.validateError();
    cy.screenshot(port+"/CreatePost"+"/Logout", { capture: "fullPage", overwrite: true });
  });
});
