// Import modules to navigate and interact
const { loginPage } = require("../utilities/login/login.cy");
const { logout } = require("../utilities/login/logout.cy");
const { tagCreate } = require("../utilities/tag/createTag.cy");
const { tagDelete } = require("../utilities/tag/deleteTag.cy");

// Parametrical variab;es
var url, user, password = "";
var tagName, tagColor, tagDescription = "";

describe('Scenario: Eliminar un Tag', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      console.error('Uncaught exception', err);
      return false;
    });
    // Obtener credenciales
    cy.fixture('credentials').then(credentials => {
        url = credentials.url;
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

    //And Creo un nuevo Tag con "<tagName>", "<tagColor>", "<tagDescription>"
    tagCreate.visit();
    tagCreate.createTag(tagName,tagColor,tagDescription);

    //When Hago click en el tag creado
    tagDelete.visit()
    tagDelete.clickOn()

    //And Hago click en eliminar
    tagDelete.delete()
    
    //And Confirmo la eliminacion
    tagDelete.confirm()
    
    //Then valido que se haya eliminado el tag
    tagDelete.validateDeleted()

    //And Cierro sesion en "<url>"
    logout.visit(url)
    logout.validateError()
  });

})