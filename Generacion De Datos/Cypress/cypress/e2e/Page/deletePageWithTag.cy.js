const { loginPage } = require("../../utilities/login/login.cy");
const { logout } = require("../../utilities/login/logout.cy");
const { tagCreate } = require("../../utilities/tag/createTag.cy");
const { tagDelete } = require("../../utilities/tag/deleteTag.cy");
const { casePageCreate } = require("../../utilities/page/createPage.cy");
const { casePageDelete } = require("../../utilities/page/deletePage.cy");
const { addTag } = require("../../utilities/addTag/addTag.cy");
import { faker } from "@faker-js/faker";

var url,
  user,
  password = "";
var tagName,
  tagColor,
  tagDescription = "";
var tittle,
  content= "";

  let tagNameFaker, tagColorFaker, tagDescriptionFaker,titleFaker, descriptionFaker;


  describe("Scenario: Agregar un tag a una pagina creada", () => {
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
      // Obtener informacion del tag
      cy.fixture("tag").then((tagInfo) => {
        tagName = tagInfo.tagDelete;
        tagColor = tagInfo.colorDelete;
        tagDescription = tagInfo.descriptionDelete;
      });
      // Obtener informacion del member
      cy.fixture("page").then((data) => {
        tittle = data.TittleWithTag;
        content = data.contentTittleWithTag;
      });
      titleFaker = faker.person.jobTitle();
      descriptionFaker = faker.lorem.paragraph();
      tagNameFaker = faker.lorem.word();
      tagColorFaker = faker.internet.color().substring(1);
      tagDescriptionFaker = faker.lorem.sentence();
    });
    beforeEach(() => {
      //Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
      loginPage.visit(url);
      loginPage.validatePage();
      loginPage.login(user, password);
      loginPage.validateError();
    });
    it("Pool de Datos A-priori", () => {
    
        //And Creo un nuevo Tag con "<tagName>", "<tagColor>", "<tagDescription>"
        tagCreate.visit();
        tagCreate.create(tagName, tagColor, tagDescription);
    
        //And Creo un nuevo page con "<tittle>", "<content>"
        casePageCreate.visit();
        casePageCreate.create(tittle, content);
    
        //When agrego el tag a la pagina con <tittle>,<tittle>
        addTag.visitPage();
        addTag.addTag(tittle, tagName);
    
        // Then Elimino la pagina con tag incluido <tittle>
        casePageDelete.visit();
        casePageDelete.delete(tittle);
      });
      it("Pool de Datos (Pseudo) Aleatorio Dinámico", () => {
    
        //And Creo un nuevo Tag con "<tagName>", "<tagColor>", "<tagDescription>"
        tagCreate.visit();
        tagCreate.create(tagNameFaker, tagColorFaker, tagDescriptionFaker);

        //And Elimino tag creado anteriormente <tagName>
        tagDelete.visit();
        tagDelete.clickOn(tagName);
        tagDelete.delete();
        tagDelete.confirm();
    
        //And Creo un nuevo page con "<tittle>", "<content>"
        casePageCreate.visit();
        casePageCreate.create(titleFaker, descriptionFaker);
    
        //When agrego el tag a la pagina con <tittle>,<tittle>
        addTag.visitPage();
        addTag.addTag(titleFaker, tagNameFaker);
    
        // Then Elimino la pagina con tag incluido <tittle>
        casePageDelete.visit();
        casePageDelete.delete(titleFaker);        
      });
      it("Escenario Aleatorio", () => {

        //And Elimino tag creado anteriormente <tagName>
        tagDelete.visit();
        tagDelete.clickOn(tagNameFaker);
        tagDelete.delete();
        tagDelete.confirm();
    
        //And Creo un nuevo Tag con "<tagName>", "<tagColor>", "<tagDescription>"
        tagNameFaker = faker.lorem.word();
        tagCreate.visit();
        tagCreate.create(tagNameFaker, tagColorFaker, tagDescriptionFaker);

        
    
        //And Creo un nuevo page con "<tittle>", "<content>"
        casePageCreate.visit();
        casePageCreate.create(titleFaker, descriptionFaker);
    
        //When agrego el tag a la pagina con <tittle>,<tittle>
        addTag.visitPage();
        addTag.addTag(titleFaker, tagNameFaker);
    
        // Then Elimino la pagina con tag incluido <tittle>
        casePageDelete.visit();
        casePageDelete.delete(titleFaker);        
      });

});