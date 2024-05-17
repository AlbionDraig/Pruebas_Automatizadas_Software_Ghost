// Import modules to navigate and interact
const { faker } = require("@faker-js/faker");
const { loginPage } = require("../../utilities/login/login.cy");
const { tagCreate } = require("../../utilities/tag/createTag.cy");

// Parametrical variables
var url, user, password;
var tagName, tagColor, tagDescription;

describe("Scenario: Crear un Tag invalido", () => {
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

  it("Pool de Datos A-priori", () => {});

  it("Pool de Datos (Pseudo) Aleatorio Dinámico", () => {
    //When Creo un nuevo Tag con "<tagName>", "<tagColor>", "<tagDescription>" con el color invalido
    tagCreate.visit();
    tagName = faker.commerce.productName();
    tagColor = faker.internet.color();
    tagDescription = faker.lorem.sentence();
    tagCreate.create(tagName, tagColor, tagDescription);
    //Then valido el error al crear el tag
    tagCreate.validateError();
  });

  it("Escenario Aleatorio", () => {});
});
