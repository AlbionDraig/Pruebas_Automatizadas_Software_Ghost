// Import modules to navigate and interact
const { loginPage } = require("../../utilities/login/login.cy");
const { logout } = require("../../utilities/login/logout.cy");
const { postCreate } = require("../../utilities/post/createPost.cy.js");
const { deletePost } = require("../../utilities/post/deletePost.cy.js");
import { faker } from "@faker-js/faker";

// Parametrizar variables
var url, user, password;
var title, content;
let titleFaker, descriptionFaker;
describe("Scenario: Crear un nuevo Post Programado", () => {
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
      // Obtener informacion del post
      cy.fixture("post").then((data) => {
        title = data.bigTittle;
        content = data.contentBigTittle;
      });
      titleFaker = generateJobTitle(200);
      descriptionFaker = faker.lorem.paragraph();
    });
    beforeEach(() => {
        //Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
        loginPage.visit(url);
        loginPage.validatePage();
        loginPage.login(user, password);
        loginPage.validateError();
    });
    it("Pool de Datos A-priori", () => {

        //When Creo un nuevo Post big title
        postCreate.visit();

        postCreate.create(title, content);
        //Then Valido Post
        postCreate.validate(title);
        
    
        //And Elimino el Post creado
        deletePost.visit()
        deletePost.delete(title)
    
        //And Cierro sesion en "<url>"
        logout.visit(url);
        logout.validateError();
      });
      it("Pool de Datos (Pseudo) Aleatorio Dinámico", () => {

        //When Creo un nuevo Post big title
        postCreate.visit();

        postCreate.create(titleFaker, descriptionFaker);
        //Then Valido Post
        postCreate.validate(titleFaker);
        
    
        //And Elimino el Post creado
        deletePost.visit()
        deletePost.delete(titleFaker)
    
        //And Cierro sesion en "<url>"
        logout.visit(url);
        logout.validateError();
      });
      it("Escenario Aleatorio", () => {
        titleFaker = generateJobTitle(200);
        descriptionFaker = faker.lorem.paragraph();
        //When Creo un nuevo Post big title
        postCreate.visit();

        postCreate.create(titleFaker, descriptionFaker);
        //Then Valido Post
        postCreate.validate(titleFaker);
        
    
        //And Elimino el Post creado
        deletePost.visit()
        deletePost.delete(titleFaker)
      });

});

function generateJobTitle(charCount) {
    let title = '';
    while (title.length < charCount) {
      title += faker.person.jobTitle() + ' ';
    }
    // Asegura que el título sea exactamente de charCount caracteres
    return title.substring(0, charCount).trim();
  }