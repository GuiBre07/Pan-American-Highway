create database PanAmerican;

use PanAmerican;

create user 'PanAmerican_insert'@'localhost' identified by 'Pan100Project';

grant insert on PanAmerican.* to 'PanAmerican_insert'@'localhost';

create user 'PanAmerican_select'@'localhost' identified by 'Pan200Project';

grant insert, select on PanAmerican.* to 'PanAmerican_select'@'localhost';

create table cadastro (
idCadastro int primary key auto_increment,
nome varchar(60) not null,
cpf char(14) not null unique,
email varchar(100) not null unique,
	constraint chkEmail check (email like'%@%')
);

create table login (
idLogin int primary key auto_increment,
login varchar(100) not null unique,
senha varchar(45) not null
-- LEMBRAR verificação de senha no vscode
);

create table destino (
idDestino int primary key auto_increment,
pais varchar(45) not null,
cidade varchar(45) not null,
tempoEstadia int
);

create table comentario (
idComentario int primary key auto_increment,
nota decimal(2,1) not null,
	constraint chkNota check (nota between 0 and 5),
comentario varchar(500),
fkDestino int not null,
	constraint fkComentario_Destino foreign key (fkDestino) references destino(idDestino),
fkCadastro int not null,
	constraint fkComentario_Cadastro foreign key (fkCadastro) references cadastro(idCadastro)
);

desc comentario;

select *from login;
select *from cadastro;
drop table comentario;
drop table cadastro;