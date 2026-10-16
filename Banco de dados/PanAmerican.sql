create database PanAmerican;

use PanAmerican;

grant insert on PanAmerican.* to 'usuario_insert '@'localhost';

create table cadastro (
idCadastro int primary key auto_increment,
nome varchar(255) not null,
cpf char(11) unique,
email varchar(255),
	constraint chkEmail check (email like'%@%'),
senha varchar(255) not null
-- LEMBRAR verificação de senha no vscode
);

create table destino (
idDestino int primary key auto_increment,
pais varchar(45) not null,
cidade varchar(45)
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

select *from cadastro;