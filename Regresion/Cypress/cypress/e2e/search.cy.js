// Import modules to navigate and interact
require('cypress-xpath');
const { loginPage } = require("../utilities/login/login.cy");
const { logout } = require("../utilities/login/logout.cy");
const { search } = require("../utilities/search/casePageCreate.cy");

// Parametrical variables
var url, port, user, password;
var searchField;

describe('Scenario: Busacr por usuario', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      console.error('Uncaught exception', err);
      return false;
    });
    // Obtener credenciales
    cy.fixture('credentials').then(credentials => {
        url = credentials.url+':'+credentials.port;
        port = credentials.port;
        user = credentials.user;
        password = credentials.password;
    });
    // Obtener credenciales
    cy.fixture('tag').then(credentials => {
        searchField = credentials.searchField;
    });
  });

  it('Steps', () => {
    //Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
    loginPage.visit(url);
    loginPage.validatePage();
    loginPage.login(user,password);
    loginPage.validateError();
    cy.screenshot(port+"/Search"+"/Login", { capture: "fullPage", overwrite: true });
    
    //When busco el usuario "<user>"
    search.visit(url)
    search.search(user)
    cy.screenshot(port+"/Search"+"/Search", { capture: "fullPage", overwrite: true });

    //Then Valido que se haya encontrado el tag "<tag>"
    search.validate()

    //And Cierro sesion en "<url>"
    logout.visit(url)
    logout.validateError()
    cy.screenshot(port+"/Search"+"/Logout", { capture: "fullPage", overwrite: true });
  });

})