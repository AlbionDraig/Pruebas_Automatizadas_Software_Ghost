// Import modules to navigate and interact
const { loginPage } = require("../utilities/login/login.cy");
const { logout } = require("../utilities/login/logout.cy");
const { tagCreate } = require("../utilities/tag/createTag.cy");
const { tagEdit } = require("../utilities/tag/editTag.cy");
const { tagDelete } = require("../utilities/tag/deleteTag.cy");

// Parametrical variables
var url, user, password = "";
var tagName, tagColor, tagDescription = "";
var tagName1, tagColor1, tagDescription1 = "";

describe('Scenario: Editar un Tag', () => {
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
      tagName1 = tagInfo.name1;
      tagColor1 = tagInfo.color1;
      tagDescription1 = tagInfo.description1;
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

    //When Edito el Tag "<tagName>" con "<tagName1>", "<tagColor1>", "<tagDescription1>"
    tagEdit.visit();
    tagEdit.editTag(tagName,tagName1,tagColor1,tagDescription1)

    //Then Valido que se haya editado el tag "<tagName1>"
    tagEdit.validateEdited(tagName1)

    //And Elimino el tag "<tagName1>" creado
    tagDelete.visit()
    tagDelete.clickOn(tagName1)
    tagDelete.delete()
    tagDelete.confirm()
    tagDelete.validateDeleted(tagName1)

    //And Cierro sesion en "<url>"
    logout.visit(url)
    logout.validateError()
  });

})