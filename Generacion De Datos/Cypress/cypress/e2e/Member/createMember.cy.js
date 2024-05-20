// Import modules to navigate and interact
const { faker } = require("@faker-js/faker");
const { loginPage } = require("../../utilities/login/login.cy");
const { memberCreate } = require("../../utilities/member/createMenber.cy");
const { memberDelete } = require("../../utilities/member/deleteMenber.cy");
const axios = require('axios');

// Parametrical variables
var url, user, password;
var name, email, note;

describe("Scenario: Crear un Member", () => {
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
    cy.fixture("member").then((data) => {
      name = data.name;
      email = data.email;
      note = data.note;
    });
  });

  beforeEach(() => {
    //Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
    loginPage.visit(url);
    loginPage.validatePage();
    loginPage.login(user, password);
    loginPage.validateError();
  });

  it("Pool de Datos A-priori", () => {
    //When Creo un nuevo Member con "<memberName>", "<memberEmail>", "<memberNote>"
    memberCreate.visit();
    memberCreate.create(name, email, note);
    memberCreate.visit();
    //Then Valido que se haya creado el Member "<memberName>"
    memberCreate.validate(name);
    //And Elimino el Member creado
    memberDelete.visit();
    memberDelete.delete();
    memberDelete.validate();
  });

  it("Escenario Aleatorio", () => {
    //When Creo un nuevo Member con "<memberName>", "<memberEmail>", "<memberNote>"
    memberCreate.visit();
    name = faker.name.firstName() + " " + faker.name.lastName();
    email = faker.internet.email();
    note = faker.lorem.paragraph();
    memberCreate.create(name, email, note);
    memberCreate.visit();
    //Then Valido que se haya creado el Member "<memberName>"
    memberCreate.validate(name);
    //And Elimino el Member creado
    memberDelete.visit();
    memberDelete.delete();
    memberDelete.validate();
  });

  it("Pool de Datos (Pseudo) Aleatorio Dinámico", () => {
    axios
      .get("https://my.api.mockaroo.com/information?key=3c537c40")
      .then((response) => {
        const mockData = response.data;
        name = mockData.name;
        email = mockData.email;
        note = mockData.email;
      });
    //When Creo un nuevo Member con "<memberName>", "<memberEmail>", "<memberNote>"
    memberCreate.visit();
    memberCreate.create(name, email, note);
    memberCreate.visit();
    //Then Valido que se haya creado el Member "<memberName>"
    memberCreate.validate(name);
    //And Elimino el Member creado
    memberDelete.visit();
    memberDelete.delete();
    memberDelete.validate();
  });
});
