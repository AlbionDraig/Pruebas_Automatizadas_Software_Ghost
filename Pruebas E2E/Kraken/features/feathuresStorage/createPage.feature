Feature: Page

@user1 @web
Scenario: Crear una page
  Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
  When Creo una pagina con "<tittle>", "<content>"
  Then Valido que se haya creado la pagina con "<tittle>"
  And Elimino la pagina creada con "<tittle>"
  And Cierro sesion en "<url>"