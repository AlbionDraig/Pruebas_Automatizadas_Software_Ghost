// Import modules to navigate and interact
const { loginPage } = require("../utilities/login/login.cy");
const { logout } = require("../utilities/login/logout.cy");
const { postCreate } = require("../utilities/post/createPost.cy.js");

//const { postDelete } = require("../../utilities/post/deletePost.cy");

// Parametrizar variables
var url, user, password = "";
var title, textpost = "";


describe('Scenario: Crear un nuevo Post', () => {
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
    // Obtener informacion del member
    cy.fixture('post').then(data => {
      title = data.title;
      textpost = data.textpost;
    });
  });

  it('Steps', () => {
    //Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
    loginPage.visit(url);
    loginPage.validatePage();
    loginPage.login(user,password);
    loginPage.validateError();

    //When Creo un nuevo Post 
    postCreate.visit()
    postCreate.create(title,textpost)

        //Then Valido que se haya creado el Member "<memberName>"
    postCreate.validate(title)

    //And Elimino el Post creado
//    postDelete.visit()
 //   postDelete.delete()
   

    //And Cierro sesion en "<url>"
    logout.visit(url)
    logout.validateError()
  });

})


  
