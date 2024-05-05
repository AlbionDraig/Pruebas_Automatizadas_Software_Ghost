Feature: Tag

@user1 @web
Scenario: Eliminar un Tag
  Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
  And Creo un nuevo Tag con "<tagName>", "<tagColor>", "<tagDescription>"
  When Elimino el tag "<tagName>" creado
  Then Valido que se haya eliminado el tag "<tagName>"
  And Cierro sesion en "<url>"