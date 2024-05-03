// Import modules to navigate and interact
const { loginPage } = require("../utilities/login/login.cy");
const { logout } = require("../utilities/login/logout.cy");
const { memberCreate } = require("../utilities/member/createMenber.cy");
const { memberEdit } = require("../utilities/member/editMenber.cy");
const { memberDelete } = require("../utilities/member/deleteMenber.cy");

// Parametrical variables
var url, user, password = "";
var name, email, note = "";
var name1, email1, note1 = "";

describe('Scenario: Editar un Member', () => {
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
    cy.fixture('member').then(data => {
      name = data.name;
      email = data.email;
      note = data.note;
      name1 = data.name1;
      email1 = data.email1;
      note1 = data.note1;
    });
  });

  it('Steps', () => {
    //Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
    loginPage.visit(url);
    loginPage.validatePage();
    loginPage.login(user,password);
    loginPage.validateError();

    //And Creo un nuevo Member con "<memberName>", "<mamberEmail>", "<mamberNote>"
    memberCreate.visit()
    memberCreate.create(name, email, note)
    memberCreate.validate(name)

    //When Edito el miembro creado con "<memberName1>", "<mamberEmail1>", "<mamberNote1>"
    memberEdit.visit()
    memberEdit.edit(name1, email1, note1)

    //Then Valido que se haya editado el Member "<memberName1>"
    memberEdit.validate(name1)

    //And Elimino el Member creado
    memberDelete.visit()
    memberDelete.delete()
    memberDelete.validate()

    //And Cierro sesion en "<url>"
    logout.visit(url)
    logout.validateError()
  });

})