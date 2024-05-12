Feature: Post

@user1 @web
Scenario: Editar un Post
  Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
  And Creo un nuevo Post con "<tittle>", "<content>"
  When Edito el Post con "<tittle>", "<tittle2>", "<content2>"
  Then Elimino el Post creado con "<tittle2>"
  And Cierro sesion en "<url>"