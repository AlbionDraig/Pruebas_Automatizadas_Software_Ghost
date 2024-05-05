const { loginPage } = require("../utilities/login/login.cy");
const { logout } = require("../utilities/login/logout.cy");
const { tagCreate } = require("../utilities/tag/createTag.cy");
const { tagDelete } = require("../utilities/tag/deleteTag.cy");
const { casePageCreate } = require("../utilities/page/casePageCreate.cy");
const { casePageDelete } = require("../utilities/page/casePageDelete.cy");
const { casePageEdit } = require("../utilities/page/casePageEdit.cy");
const { caseAddTagToPage } = require("../utilities/page/caseAddTagToPage.cy");

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
        tittle2 = data.tittle2;
        content2 = data.content2;
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

        //Then agrego el tag a la pagina
        caseAddTagToPage.visit()
        caseAddTagToPage.addTagToPage(tittle,tagName)

    
        //And Elimino el tag creado
        tagDelete.visit()
        tagDelete.clickOn()
        tagDelete.delete()
        tagDelete.confirm()
        

        //And Editar una pagina creada
        casePageEdit.visit()
        casePageEdit.editarPage(tittle,tittle2,content2)

        // And Eliminar Pagina
        casePageDelete.delete(tittle2) 
    
        //And Cierro sesion en "<url>"
        logout.visit(url)
        logout.validateError()
      });
    
    })