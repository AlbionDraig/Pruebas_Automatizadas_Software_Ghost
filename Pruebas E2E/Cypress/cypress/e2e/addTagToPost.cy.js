const { loginPage } = require("../utilities/login/login.cy");
const { logout } = require("../utilities/login/logout.cy");
const { tagCreate } = require("../utilities/tag/createTag.cy");
const { tagDelete } = require("../utilities/tag/deleteTag.cy");
const { postCreate } = require("../utilities/post/createPost.cy.js");
const { deletePost } = require("../utilities/post/deletePost.cy.js");
const { addTag } = require("../utilities/addTag/addTag.cy");

// Parametrical variables
var url, user, password;
var tagName, tagColor, tagDescription;
var title, textPost;

describe("Scenario: Editar un Tag", () => {
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
    // Obtener informacion del tag
    cy.fixture("tag").then((tagInfo) => {
      tagName = tagInfo.name;
      tagColor = tagInfo.color;
      tagDescription = tagInfo.description;
    });
    // Obtener informacion del post
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

    //And Creo un nuevo Tag con "<tagName>", "<tagColor>", "<tagDescription>"
    tagCreate.visit();
    tagCreate.createTag(tagName, tagColor, tagDescription);

    //And Creo un nuevo Post
    postCreate.visit();
    postCreate.create(title, textPost);
    postCreate.validate(title);

    //When agrego el tag al post con <title>,<title>
    addTag.visitPosts()
    addTag.addTag(title,tagName)

    //Then Validar tag en el post <tagName>
    addTag.validate(tagName)

    //And Elimino el tag creado con <tagName>
    tagDelete.visit();
    tagDelete.clickOn(tagName);
    tagDelete.delete();
    tagDelete.confirm();

    //And Elimino el Post creado
    deletePost.visit();
    deletePost.delete(title);

    //And Cierro sesion en "<url>"
    logout.visit(url);
    logout.validateError();
  });
});
