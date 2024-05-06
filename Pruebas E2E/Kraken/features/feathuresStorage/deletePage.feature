Feature: Page

@user1 @web
Scenario: Eliminar una page
  Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
  And Creo una pagina con "<tittle>", "<content>"
  When Elimino la pagina creada con "<tittle>"
  Then Valido que se haya eliminado la pagina con "<tittle>"
  And Cierro sesion en "<url>"