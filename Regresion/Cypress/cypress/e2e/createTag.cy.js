// Import modules to navigate and interact
require('cypress-xpath');
const { loginPage } = require("../utilities/login/login.cy");
const { logout } = require("../utilities/login/logout.cy");
const { tagCreate } = require("../utilities/tag/createTag.cy");
const { tagEdit } = require("../utilities/tag/editTag.cy");
const { tagDelete } = require("../utilities/tag/deleteTag.cy");

// Parametrical variables
var url, port, user, password;
var tagName, tagColor, tagDescription;

describe('Scenario: Editar un Tag', () => {
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
    // Obtener informacion del tag
    cy.fixture('tag').then(tagInfo => {
      tagName = tagInfo.name;
      tagColor = tagInfo.color;
      tagDescription = tagInfo.description;
    });
  });

  it('Steps', () => {
    //Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
    loginPage.visit(url);
    loginPage.validatePage();
    loginPage.login(user,password);
    loginPage.validateError();
    cy.screenshot(port+"/CreateTag"+"/Login", { capture: "fullPage", overwrite: true });

    //When Creo un nuevo Tag con "<tagName>", "<tagColor>", "<tagDescription>"
    tagCreate.visit(url);
    tagCreate.createTag(url,tagName,tagColor,tagDescription);
    cy.screenshot(port+"/CreateTag"+"/CreateTag", { capture: "fullPage", overwrite: true });

    //Then valido ques e haya creado el tag "<tagName>"
    tagCreate.validate(tagName);

    //And Elimino el tag "<tagName1>" creado
    tagDelete.visit(url)
    tagDelete.clickOn(tagName)
    tagDelete.delete()
    tagDelete.confirm()
    tagDelete.validateDeleted(tagName)
    cy.screenshot(port+"/CreateTag"+"/DeleteTag", { capture: "fullPage", overwrite: true });

    //And Cierro sesion en "<url>"
    logout.visit(url)
    logout.validateError()
    cy.screenshot(port+"/CreateTag"+"/Logout", { capture: "fullPage", overwrite: true });
  });

})