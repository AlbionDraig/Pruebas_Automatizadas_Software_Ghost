// Import modules to navigate and interact
const { faker } = require("@faker-js/faker");
const { loginPage } = require("../../utilities/login/login.cy");
const { tagCreate } = require("../../utilities/tag/createTag.cy");
const { tagDelete } = require("../../utilities/tag/deleteTag.cy");

// Parametrical variables
var url, user, password;
var tagName, tagColor, tagDescription;

describe("Scenario: Crear un Tag", () => {
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
  });

  beforeEach(() => {
    //Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
    loginPage.visit(url);
    loginPage.validatePage();
    loginPage.login(user, password);
    loginPage.validateError();
  });

  it("Ejecución del escenario", () => {
    //When Creo un nuevo Tag con "<tagName>", "<tagColor>", "<tagDescription>"
    tagCreate.visit();
    tagName = faker.commerce.productName();
    tagColor = faker.internet.color().replace(/#/g, "");
    tagDescription = faker.lorem.sentence();
    tagCreate.create(tagName, tagColor, tagDescription);
    tagCreate.visit();
    //Then valido el tag "<tagName>" creado
    tagCreate.validate(tagName);
    //And Elimino el tag creado
    tagDelete.visit();
    tagDelete.clickOn(tagName);
    tagDelete.delete();
    tagDelete.confirm();
    tagDelete.validateDeleted(tagName);
  });
});
