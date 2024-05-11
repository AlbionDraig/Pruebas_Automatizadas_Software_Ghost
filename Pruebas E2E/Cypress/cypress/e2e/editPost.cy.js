const { loginPage } = require("../utilities/login/login.cy");
const { logout } = require("../utilities/login/logout.cy");
const { postCreate } = require("../utilities/post/createPost.cy.js");
const { deletePost } = require("../utilities/post/deletePost.cy.js");
const { casePostEdit } = require("../utilities/post/editPost.cy");

// Parametrical variables
var url,
  user,
  password = "";
var title,
	content,
  title2,
  content2 = "";

describe("Scenario: Editar una post", () => {
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
      content = data.textPost;
      title2 = data.title2;
      content2 = data.textPost2;
    });
  });
  it("Steps", () => {
    //Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
    loginPage.visit(url);
    loginPage.validatePage();
    loginPage.login(user, password);
    loginPage.validateError();
    cy.screenshot("Login", { capture: "fullPage", overwrite: true });

    //and Creo un nuevo post con "<tittle>", "<content>"
    postCreate.visit();
    postCreate.create(title, content);
    cy.screenshot("CreatePost", { capture: "fullPage", overwrite: true });
    
    //When Edito una post con "<tittle>", "<tittle2>", "<content2>"
    casePostEdit.editarPost(title, title2, content2);
    cy.screenshot("EditPost", { capture: "fullPage", overwrite: true });

    // Then Valido que se haya editado la post "<tittle2>"
    casePostEdit.validate(title2);

    // And Elimino la Pagina con "<tittle2>"
    deletePost.visit()
    deletePost.delete(title)
    cy.screenshot("DeletePage", { capture: "fullPage", overwrite: true });

    //And Cierro sesion en "<url>"
    logout.visit(url);
    logout.validateError();
    cy.screenshot("Logout", { capture: "fullPage", overwrite: true });
  });
});
