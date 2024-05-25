// Import modules to navigate and interact
const { faker } = require("@faker-js/faker");
const { loginPage } = require("../../utilities/login/login.cy");
const { tagCreate } = require("../../utilities/tag/createTag.cy");
const { tagEdit } = require("../../utilities/tag/editTag.cy");
const { tagDelete } = require("../../utilities/tag/deleteTag.cy");

// Parametrical variables
var url, user, password;
var tagName, tagColor, tagDescription, invalidColor;
var tagName1, tagColor1, tagDescription1;

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
      tagName1 = tagInfo.name1;
      tagColor = tagInfo.color;
      tagColor1 = tagInfo.color1;
      invalidColor = tagInfo.invalidColor;
      tagDescription = tagInfo.description;
      tagDescription1 = tagInfo.description1;
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
    faker.seed(123)
    //And Creo un nuevo Tag con "<tagName>", "<tagColor>", "<tagDescription>"
    tagCreate.visit();
    tagName = faker.commerce.productName();
    tagColor = faker.internet.color().replace(/#/g, "");
    tagDescription = faker.lorem.sentence();
    tagCreate.create(tagName, tagColor, tagDescription);
    tagCreate.visit();
    //When Edito el Tag "<tagName>" con "<tagName1>", "<tagColor1>", "<tagDescription1>" con el color invalido
    tagEdit.visit();
    tagName1 = faker.commerce.productName();
    tagColor1 = faker.internet.color();
    tagDescription1 = faker.lorem.sentence();
    tagEdit.edit(tagName, tagName1, tagColor1, tagDescription1);
    //Then Valido el error al editar el tag
    tagEdit.validateError();
    tagEdit.visit();
    tagEdit.acceptChanges();
    //And Elimino el tag "<tagName>" creado
    tagDelete.visit();
    tagDelete.clickOn(tagName);
    tagDelete.delete();
    tagDelete.confirm();
    tagDelete.validateDeleted(tagName1);
  });
});
