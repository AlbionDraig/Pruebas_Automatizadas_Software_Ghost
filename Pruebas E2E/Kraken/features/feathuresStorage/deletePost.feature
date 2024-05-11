Feature: Post

@user1 @web
Scenario: Eliminar un Post
  Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
  And Creo una Post con "<tittle>", "<content>"
  When Elimino el Post  creado con "<tittle>"
  Then Valido que se haya eliminado el Post con "<tittle>"
  And Cierro sesion en "<url>"