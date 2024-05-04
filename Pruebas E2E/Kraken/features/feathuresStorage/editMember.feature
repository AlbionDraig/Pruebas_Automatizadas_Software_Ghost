Feature: Member

@user1 @web
Scenario: Editar un Member
  Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
  And Creo un nuevo Member con "<memberName>", "<memberEmail>", "<memberNote>"
  And Valido que se haya creado el Member "<memberName>"
  When Edito el miembro creado con "<memberName1>", "<memberEmail1>", "<memberNote1>"
  Then Valido que se haya editado el Member "<memberName1>"
  And Elimino el Member creado 
  And Valido que se haya eliminado el Member
  And Cierro sesion en "<url>"