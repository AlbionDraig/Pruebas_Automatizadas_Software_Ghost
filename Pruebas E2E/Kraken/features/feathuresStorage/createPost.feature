Feature: Post

@user1 @web
Scenario: Crear un Post
  Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
  When Creo un nuevo Post con "<tittle>", "<content>"
  Then Valido que se haya creado el Post con "<tittle>"
  And Elimino el Post creado con "<tittle>"
  And Cierro sesion en "<url>"