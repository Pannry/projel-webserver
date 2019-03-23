-- DROP DATABASE IF EXISTS projel
-- CREATE DATABASE projel;
USE projel;

-- Tabela instituição
create table instituicao(
	id int auto_increment,
	nome varchar(100),
	cnpj varchar(32),
	endereco varchar(64),
	cep varchar(32),
	numero varchar(32),
	telefone varchar(32),
	primary key (id)
);
-- Tabela aluna
create table aluno(
	id int auto_increment primary key,
	nome varchar(32) NOT NULL,
	email varchar(32) NOT NULL,
	email_validado varchar(5),
	senha varchar(128) NOT NULL,
	instituicao_id int,
	foreign key (instituicao_id) references instituicao(id)
);
-- Tabela professor
create table professor(
	id int auto_increment,
	nome varchar(100) NOT NULL,
	endereco varchar(100),
	email varchar(100) NOT NULL,
	senha varchar(200) NOT NULL,
	cpf varchar(30),
	cep varchar(30),
	numero varchar(30),
	telefone varchar(30),
	instituicao_id int,
	foreign key (instituicao_id) references instituicao(id),
	primary key (id)
);
-- Tabela da sala
create table sala(
	id int auto_increment,
	id_professor int,
	nome varchar(32),
	semestre varchar(32),
	cod_sala VARCHAR(20) NOT NULL,
	comentario varchar(1000),
	foreign key (id_professor) references professor(id),
	primary key (id)
);
-- Tabela exercícios
create table exercicios(
	id int auto_increment,
	id_professor int,
	titulo varchar(100),
	descricao varchar(1500),
	foreign key (id_professor) references professor(id),
	primary key(id)
);
create table exercicios_material(
	id int,
	file_name varchar (1000),  
	foreign key (id) references exercicios(id) ON DELETE CASCADE
);
-- Tabela de resposta
create table resposta(
	id_aluno int,
	id_exercicios int,
	id_sala int,
	resposta varchar (300),
	file_name varchar (100),
	foreign key (id_aluno) references aluno(id),
	foreign key (id_exercicios) references exercicios(id) ON DELETE CASCADE,
	foreign key (id_sala) references sala(id) ON DELETE CASCADE
);
-- Tabela da lista de exercícios
create table lista(
	id int auto_increment,
	id_professor int,
	titulo varchar (32),
	descricao varchar (1500),
	tipo varchar (32),    
	foreign key (id_professor) references professor(id),
	primary key(id)
);
-- Tabela da lista de exercicios
create table lista_exercicios(
	id_lista int,
	id_exercicios int,
	foreign key (id_lista) references lista(id) ON DELETE CASCADE,
	foreign key (id_exercicios) references exercicios(id) ON DELETE CASCADE,
	primary key(id_lista, id_exercicios)
);
-- Tabela nota
create table nota(
	id_aluno int,
	id_lista int,
	id_sala int,
	nota float,
	primary key(id_aluno, id_lista, id_sala),
	foreign key(id_aluno) references aluno(id),
	foreign key(id_sala) references sala(id) ON DELETE CASCADE,
	foreign key(id_lista) references lista(id) ON DELETE CASCADE
);
-- Tabela de relacao com a lista de exercicios com a sala
create table sala_lista(
	id_sala int,
	id_lista int,
	foreign key (id_sala) references sala(id) ON DELETE CASCADE,
	foreign key (id_lista) references lista(id) ON DELETE CASCADE,
	primary key (id_sala, id_lista)
);
create table didatico(
	id int auto_increment,
	id_professor int,
	titulo varchar (50),
	descricao varchar (1500),
	foreign key (id_professor) references professor(id),
	primary key(id)
);
create table didatico_material(
	id int,
	file_name varchar (1000),
	foreign key (id) references didatico(id) ON DELETE CASCADE
);
create table sala_didatico(
	id_sala int,
	id_didatico int,
	foreign key (id_sala) references sala(id) ON DELETE CASCADE,
	foreign key (id_didatico) references didatico(id) ON DELETE CASCADE,
	primary key (id_sala, id_didatico)
);
-- Tabela de relação dos alunos com as salas
create table cursa(
	id_sala int,
	id_aluno int,
	aluno_aceito boolean default false,
	foreign key (id_sala) references sala(id) ON DELETE CASCADE,
	foreign key (id_aluno) references aluno(id),
	primary key (id_sala, id_aluno)
);
