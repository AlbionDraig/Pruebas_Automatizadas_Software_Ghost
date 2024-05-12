Feature: Post

@user1 @web
Scenario: Crear un Post programado
  Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
  And Creo un nuevo Post con "<tittle>", "<content>"
  When Creo un schedule post "<tittle>"
  Then Valido que se programo el Post "<tittle>"
  And Elimino el Post creador con "<tittle>"
  And Cierro sesion en "<url>"