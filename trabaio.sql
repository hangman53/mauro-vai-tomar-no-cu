create database trabaio;
use trabaio;
  
  create table jogos(
  id int auto_increment primary key,
  data date,
  timeMandante varchar(100),
  timeVisitante varchar(100),
  placar varchar(10),
  local varchar(300)
  );
  select*from jogos;
  


  drop user 'nodeApp';
  
  create user 'nodeApp'@'%' identified  with mysql_native_password by 'Abcd&123';
    grant all on trabaio.* to 'nodeApp'@'%';