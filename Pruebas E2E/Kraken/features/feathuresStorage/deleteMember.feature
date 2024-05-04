Feature: Member

@user1 @web
Scenario: Eliminar un member
  Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
  And Creo un nuevo Member con "<memberName>", "<memberEmail>", "<memberNote>"
  And Valido que se haya creado el Member "<memberName>"
  When Elimino el Member creado
  Then Valido que se haya eliminado el Member
  And Cierro sesion en "<url>"