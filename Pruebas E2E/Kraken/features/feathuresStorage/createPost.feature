Feature: Post

@user1 @web
Scenario: Crear un Post
  Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
  When Creo un post con "<tittle>", "<content>"
  Then Valido que se haya creado post con "<tittle>"
  And Elimino la post creado con "<tittle>"
  And Cierro sesion en "<url>"