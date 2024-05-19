const { loginPage } = require("../../utilities/login/login.cy");
const { logout } = require("../../utilities/login/logout.cy");
const { tagCreate } = require("../../utilities/tag/createTag.cy");
const { tagDelete } = require("../../utilities/tag/deleteTag.cy");
const { postCreate } = require("../../utilities/post/createPost.cy");
const { deletePost } = require("../../utilities/post/deletePost.cy");
const { addTag } = require("../../utilities/addTag/addTag.cy");
import { faker } from "@faker-js/faker";

// Parametrical variables
var url, user, password;
var tagName, tagColor, tagDescription;
var title, textPost;

let tagNameFaker, tagColorFaker, tagDescriptionFaker,titleFaker, descriptionFaker;

describe("Scenario: Editar un Tag", () => {
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
    titleFaker = faker.person.jobTitle();
    descriptionFaker = faker.lorem.paragraph();
    tagNameFaker = faker.lorem.word();
    tagColorFaker = faker.internet.color().substring(1);
    tagDescriptionFaker = faker.lorem.sentence();
  });
  beforeEach(() => {
    //Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
    loginPage.visit(url);
    loginPage.validatePage();
    loginPage.login(user, password);
    loginPage.validateError();
  });
  it("Pool de Datos A-priori", () => {

    //And Creo un nuevo Tag con "<tagName>", "<tagColor>", "<tagDescription>"
    tagCreate.visit();
    tagCreate.create(tagName, tagColor, tagDescription);

    //And Creo un nuevo Post
    postCreate.visit();
    postCreate.create(title, textPost);
    postCreate.validate(title);

    //When agrego el tag al post con <title>,<title>
    addTag.visitPosts();
    addTag.addTag(title, tagName);

    //Then Validar tag en el post <tagName>
    addTag.validate(tagName);

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
  it("Pool de Datos (Pseudo) Aleatorio Dinámico", () => {

    //And Creo un nuevo Tag con "<tagName>", "<tagColor>", "<tagDescription>"
    tagCreate.visit();
    tagCreate.create(tagNameFaker, tagColorFaker, tagDescriptionFaker);

    //And Creo un nuevo Post
    postCreate.visit();
    postCreate.create(titleFaker, descriptionFaker);
    postCreate.validate(titleFaker);

    //When agrego el tag al post con <title>,<title>
    addTag.visitPosts();
    addTag.addTag(titleFaker, tagNameFaker);

    //Then Validar tag en el post <tagName>
    addTag.validate(tagNameFaker);

    //And Elimino el tag creado con <tagName>
    tagDelete.visit();
    tagDelete.clickOn(tagNameFaker);
    tagDelete.delete();
    tagDelete.confirm();

    //And Elimino el Post creado
    deletePost.visit();
    deletePost.delete(titleFaker);

    //And Cierro sesion en "<url>"
    logout.visit(url);
    logout.validateError();
  });
  it("Escenario Aleatorio", () => {
    titleFaker = faker.person.jobTitle();
    descriptionFaker = faker.lorem.paragraph();
    tagNameFaker = faker.lorem.word();
    tagColorFaker = faker.internet.color().substring(1);
    tagDescriptionFaker = faker.lorem.sentence();
    //And Creo un nuevo Tag con "<tagName>", "<tagColor>", "<tagDescription>"
    tagCreate.visit();
    tagCreate.create(tagNameFaker, tagColorFaker, tagDescriptionFaker);

    //And Creo un nuevo Post
    postCreate.visit();
    postCreate.create(titleFaker, descriptionFaker);
    postCreate.validate(titleFaker);

    //When agrego el tag al post con <title>,<title>
    addTag.visitPosts();
    addTag.addTag(titleFaker, tagNameFaker);

    //Then Validar tag en el post <tagName>
    addTag.validate(tagNameFaker);

    //And Elimino el tag creado con <tagName>
    tagDelete.visit();
    tagDelete.clickOn(tagNameFaker);
    tagDelete.delete();
    tagDelete.confirm();

    //And Elimino el Post creado
    deletePost.visit();
    deletePost.delete(titleFaker);
  });
});
