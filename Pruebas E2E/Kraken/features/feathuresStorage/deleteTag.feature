Feature: Tag

@user1 @web
Scenario: Eliminar un Tag
  Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
  And Tomo screenshot - Nombre "Login" - Carpeta "DeleteTag"
  And Creo un nuevo Tag con "<tagName>", "<tagColor>", "<tagDescription>"
  And Tomo screenshot - Nombre "CreateTag" - Carpeta "DeleteTag"
  When Elimino el tag "<tagName>" creado
  And Tomo screenshot - Nombre "DeleteTag" - Carpeta "DeleteTag"
  Then Valido que se haya eliminado el tag "<tagName>"
  And Cierro sesion en "<url>"
  And Tomo screenshot - Nombre "Logout" - Carpeta "DeleteTag"