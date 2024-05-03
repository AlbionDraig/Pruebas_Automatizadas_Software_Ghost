Feature: Tag

@user1 @web
Scenario: Eliminar un Tag
  Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
  And Creo un nuevo Tag con "<tagName>", "<tagColor>", "<tagDescription>"
  When Hago click en el tag creado
  And Hago click en eliminar
  And Confirmo la eliminacion
  Then valido que se haya eliminado el tag
  And Cierro sesion en "<url>"