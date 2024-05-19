// Import modules to navigate and interact
const { loginPage } = require("../../utilities/login/login.cy");
const { logout } = require("../../utilities/login/logout.cy");
const { postCreate } = require("../../utilities/post/createPost.cy.js");
const { deletePost } = require("../../utilities/post/deletePost.cy.js");
const { postPublish } = require("../../utilities/post/publishPost.cy.js");
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
        title = data.title;
        content = data.textPost;
      });
      titleFaker = faker.person.jobTitle();
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

        //Amd Creo un nuevo Post
        postCreate.visit();
        postCreate.create(title, content);
        postCreate.validate(title);
        
        
        //And Publico nuevo Post
        postPublish.intoPost(title);
        postPublish.publishPost();

        postCreate.visit();
        postPublish.intoPost(title);
        postPublish.unpublishPost();
    
        //When Elimino el Post creado
        deletePost.visit()
        deletePost.delete(title)
    
        //And Cierro sesion en "<url>"
        logout.visit(url);
        logout.validateError();
      });

      it("Pool de Datos (Pseudo) Aleatorio Dinámico", () => {

        //Amd Creo un nuevo Post
        postCreate.visit();
        postCreate.create(titleFaker, descriptionFaker);
        postCreate.validate(titleFaker);
        
        
        //And Publico nuevo Post
        postPublish.intoPost(titleFaker);
        postPublish.publishPost();
        
        postCreate.visit();
        postPublish.intoPost(titleFaker);
        postPublish.unpublishPost();
    
        //When Elimino el Post creado
        deletePost.visit()
        deletePost.delete(titleFaker)
    
        //And Cierro sesion en "<url>"
        logout.visit(url);
        logout.validateError();
      });
      it("Pool de Datos (Pseudo) Aleatorio Dinámico", () => {
        titleFaker = faker.person.jobTitle();
        descriptionFaker = faker.lorem.paragraph();

        //Amd Creo un nuevo Post
        postCreate.visit();
        postCreate.create(titleFaker, descriptionFaker);
        postCreate.validate(titleFaker);
        
        
        //And Publico nuevo Post
        postPublish.intoPost(titleFaker);
        postPublish.publishPost();
        
        postCreate.visit();
        postPublish.intoPost(titleFaker);
        postPublish.unpublishPost();
    
        //When Elimino el Post creado
        deletePost.visit()
        deletePost.delete(titleFaker)
      });


});