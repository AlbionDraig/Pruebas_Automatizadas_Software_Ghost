const { loginPage } = require("../utilities/login/login.cy");
const { logout } = require("../utilities/login/logout.cy");
const { tagCreate } = require("../utilities/tag/createTag.cy");
const { tagDelete } = require("../utilities/tag/deleteTag.cy");
const { casePageCreate } = require("../utilities/page/casePageCreate.cy");
const { casePageDelete } = require("../utilities/page/casePageDelete.cy");
const { addTag } = require("../utilities/addTag/addTag.cy");

// Parametrical variables
var url, user, password = "";
var tagName, tagColor, tagDescription = "";
var tittle, content,tittle2, content2 = "";

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
      });
      // Obtener informacion del member
      cy.fixture('page').then(data => {
        tittle = data.tittle;
        content = data.content;
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

        //And Creo un nuevo page con "<tittle>", "<content>"
        casePageCreate.visit()
        casePageCreate.create(tittle,content)

        //When agrego el tag a la pagina con <tittle>,<tittle>
        addTag.visitPage()
        addTag.addTag(tittle,tagName)

        //Then Validar tag en la pagina <tagName>
        addTag.validate(tagName)

    
        //And Elimino el tag creado con <tagName>
        tagDelete.visit()
        tagDelete.clickOn(tagName)
        tagDelete.delete()
        tagDelete.confirm()

        // And Elimino la pagina con <tittle>
        casePageDelete.visit()
        casePageDelete.delete(tittle) 
    
        //And Cierro sesion en "<url>"
        logout.visit(url)
        logout.validateError()
      });
    
    })