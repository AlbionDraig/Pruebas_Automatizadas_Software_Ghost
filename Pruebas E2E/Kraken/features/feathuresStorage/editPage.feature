Feature: Page

@user1 @web
Scenario: Editar una page
  Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
  and Creo una pagina con "<tittle>", "<content>"
  When Edito la pagina ya creada con "<tittle>", "<tittle2>", "<content2>"
  Then Valido que se haya editado la pagina con "<tittle2>"
  And Elimino la pagina editada con "<tittle2>"
  And Cierro sesion en "<url>"