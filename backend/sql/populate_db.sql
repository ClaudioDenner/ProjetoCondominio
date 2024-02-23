USE Condominio;

INSERT INTO auth (name,login,password,permission) values ('Jose Carlos','josecarlos@condominio.com',"$2b$10$kKK/xtKc.9/FEHQLshqsCOkOStRM8C47MFtqqjdp5jJgPai1Ct9y6",'admin'), ('Maria Clara','mariaclara@condominio.com',"$2b$10$kKK/xtKc.9/FEHQLshqsCOkOStRM8C47MFtqqjdp5jJgPai1Ct9y6",'user');

INSERT INTO locations (location_name) VALUES ('TOWER1 N10'),('TOWER1 N20'),('TOWER1 N30'), ('TOWER1 N40'), ('TOWER1 N50');

INSERT INTO housings (owner_full_name,owner_cpf,owner_birthday,authId,locationId) values ('Jose Carlos Amarante','06033355544','1994-04-15',1,1), ('Maria Clara Santos','00011554455','1990-06-17',2,2); 

INSERT INTO notices (title, body, author) VALUES ('Sejam muito bem vindos ao nosso Condominio!','Esperamos fornecer o melhor serviço para que vocês possam residir tranquilamente.', 1),('Wifi Público no Pátio da Recepção','Rede: condominio0057,  senha: #condominio#', 1);

INSERT INTO requests (title, description, housingId) VALUES ('Solicitação de Fatura por email','Prezado Condominio, solicitamos receber nossas faturas também por email',2);

INSERT INTO finances (description, reference , value, housingId ) VALUES ('Fatura','01/24',300,2), ('Fatura','02/24',300,2), ('Fatura','03/24',300,2), ('Fatura','04/24',300,2);