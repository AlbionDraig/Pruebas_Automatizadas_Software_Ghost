Feature: Member

@user1 @web
Scenario: Crear un Member
  Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
  When Creo un nuevo Member con "<memberName>", "<memberEmail>", "<memberNote>"
  Then Valido que se haya creado el Member "<memberName>"
  And Elimino el Member creado 
  And Valido que se haya eliminado el Member
  And Cierro sesion en "<url>"