const { faker } = require("@faker-js/faker");
const { loginPage } = require("../../utilities/login/login.cy");

// Parametrical variables
var url, user, password, invalidPassword;

describe("Scenario: Ingresar una contrasena invalida", () => {
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
      invalidPassword = credentials.invalidPassword;
    });
  });

  it("Ingresar con usuario valido para evitar timeout", () => {
    loginPage.visit(url);
    loginPage.validatePage();
    loginPage.login(user, password);
  });
  it("Ejecución de escenario", () => {
    faker.seed(123)
    //Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
    loginPage.visit(url);
    loginPage.validatePage();
    //When Digito el usuario correcto y la contrasena incorrecta
    password = faker.internet.password();
    loginPage.login(user, password);
    //Then Valido el mensaje de error
    loginPage.validateErrorMessagePassword();
  });
});
