// Import modules to navigate and interact
const { faker } = require("@faker-js/faker");
const { loginPage } = require("../../utilities/login/login.cy");
const { memberCreate } = require("../../utilities/member/createMenber.cy");
const { memberEdit } = require("../../utilities/member/editMenber.cy");
const { memberDelete } = require("../../utilities/member/deleteMenber.cy");

// Parametrical variables
var url, user, password;
var name, email, note;
var name1, email1, note1;

describe("Scenario: Editar un Member", () => {
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
    //And Creo un nuevo Member con "<memberName>", "<memberEmail>", "<memberNote>"
    memberCreate.visit();
    memberCreate.create(name, email, note);
    memberCreate.visit();
    memberCreate.validate(name);
    //When Edito el miembro creado con "<memberName1>", "<memberEmail1>", "<memberNote1>"
    memberEdit.visit();
    memberEdit.edit(name, name1, email1, note1);
    memberEdit.visit();
    //Then Valido que se haya editado el Member "<memberName1>"
    memberEdit.validate(name1);
    //And Elimino el Member creado
    memberDelete.visit();
    memberDelete.delete();
    memberDelete.validate();
  });

  it("Pool de Datos (Pseudo) Aleatorio Dinámico", () => {
    //And Creo un nuevo Member con "<memberName>", "<memberEmail>", "<memberNote>"
    memberCreate.visit();
    name = faker.name.firstName() + " " + faker.name.lastName();
    email = faker.internet.email();
    note = faker.lorem.paragraph();
    memberCreate.create(name, email, note);
    memberCreate.visit();
    memberCreate.validate(name);
    //When Edito el miembro creado con "<memberName1>", "<memberEmail1>", "<memberNote1>"
    memberEdit.visit();
    name1 = faker.name.firstName() + " " + faker.name.lastName();
    email1 = faker.internet.email();
    note1 = faker.lorem.paragraph();
    memberEdit.edit(name, name1, email1, note1);
    memberEdit.visit();
    //Then Valido que se haya editado el Member "<memberName1>"
    memberEdit.validate(name1);
    //And Elimino el Member creado
    memberDelete.visit();
    memberDelete.delete();
    memberDelete.validate();
  });

  it("Escenario Aleatorio", () => {});
});
