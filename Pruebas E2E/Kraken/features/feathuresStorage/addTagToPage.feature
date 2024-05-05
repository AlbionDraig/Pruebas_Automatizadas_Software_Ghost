Feature: Page

@user1 @web
Scenario: Adicionar un tag a una pagina
  Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
  And Creo un nuevo Tag con "<tagName>", "<tagColor>", "<tagDescription>"
  And Creo una pagina con "<tittle>", "<content>"
  When Agrego tag a la pagina creada con "<tittle>", "<tagName>"
  Then Elimino el tag "<tagName>" creado
  And Elimino la pagina creada con "<tittle>"
  And Cierro sesion en "<url>"