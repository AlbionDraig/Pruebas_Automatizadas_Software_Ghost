Feature: Post

@user1 @web
Scenario: Crear un Quick Post
  Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
  When Creo un Draft Post con "<tittle>", "<content>" 
  And Valido que se haya creado Post Draft
  Then publico el Post que estaba como Draft "<tittle>"
  And Elimino el post creado con "<tittle>"
  And Cierro sesion en "<url>"