const { faker } = require("@faker-js/faker");
const { loginPage } = require("../../utilities/login/login.cy");

// Parametrical variables
var url, user, password, invalidUser;

describe("Scenario: Ingresar un usuario invalido", () => {
  beforeEach(() => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      console.error("Uncaught exception", err);
      return false;
    });
    // Obtener credenciales
    cy.fixture("credentials").then((credentials) => {
      url = credentials.url;
      user = credentials.user;
      invalidUser = credentials.invalidUser;
      password = credentials.password;
    });
    // Obtener informacion
    cy.fixture("page").then((data) => {
      tittle = data.tittle;
      content = data.content;
      tittle2 = data.tittle2;
      content2 = data.content2;
    });
  });

  it("Ingresar con usuario valido para evitar timeout", () => {
    loginPage.visit(url);
    loginPage.validatePage();
    loginPage.login(user, password);
  });

  it("Pool de Datos A-priori", () => {});

  it("Pool de Datos (Pseudo) Aleatorio Dinámico", () => {
    //Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
    loginPage.visit(url);
    loginPage.validatePage();
    //When Digito el usuario incorrecto y la contrasena correcta
    user = faker.internet.email();
    loginPage.login(user, password);
    //Then Valido el mensaje de error
    loginPage.validateErrorMessageUser();
  });

  it("Escenario Aleatorio", () => {});
});
