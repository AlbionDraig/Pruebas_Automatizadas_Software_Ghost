Feature: Post

@user1 @web
Scenario: Editar un Post
  Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
  And Creo un Post con "<tittle>", "<content>"
  And Valido que el Post este creado
  When Edito el Post ya creado con "<tittle>", "<tittle2>", "<content2>"
  Then Valido que se haya editado el Post con "<tittle2>"
  And Elimino el Post editado con "<tittle2>"
  And Cierro sesion en "<url>"