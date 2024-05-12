Feature: Post

@user1 @web
Scenario: Adicionar un tag a un nuevo Post
  Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
  And Creo un nuevo Tag con "<tagName>", "<tagColor>", "<tagDescription>"
  And Creo un nuevo Post con "<tittle>", "<content>"
  When Agrego tag a un nuevo Post con  "<tittle>", "<tagName>"
  Then Elimino el tag "<tagName>" creado
  And Elimino el Post creado con "<tittle>"
  And Cierro sesion en "<url>"