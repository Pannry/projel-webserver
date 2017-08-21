-- Tabela aluna
create table aluno(
    id int auto_increment primary key,
    nome varchar(32),
    matricula varchar(32),
    email varchar(32),
    senha varchar(32),
    instituicao_id int,
    foreign key (instituicao_id) references instituicao(id)
);
-- Tabela professor
create table professor(
    id int auto_increment,
    nome varchar(32),
    cpf int,
    endereco varchar(64),
    cep int,
    numero int,
    telefone int,
    email varchar(32),
    primary key (id)
);
-- Tabela instituição
create table instituicao(
    id int auto_increment,
    nome varchar(62),
    cnpj varchar(32),
    endereco varchar(64),
    cep varchar(32),
    numero varchar(32),
    telefone varchar(32),
    primary key (id)
);
-- Tabela disciplina
create table disciplina(
    id int auto_increment,
    nome varchar(32),
    primary key (id)
);
-- Tabela turma
create table turma(
    id int auto_increment,
    nome varchar(32),
    primary key (id)
);
-- Tabela exercícios
create table exercicios(
    id int auto_increment,
    titulo varchar(1000),
    proposito varchar(100),
    imagem varchar(32),
    primary key(id)
);
-- Tabela prova
create table prova(
    id int auto_increment,
    titulo varchar(1000),
    proposito varchar(100),
    imagem varchar(32),
    primary key(id)
);
-- Tabela semestre
create table semestre(
    id int auto_increment,
    nome varchar(32),
    primary key(id)
);
-- Inserir dados na tabela instituição
insert into instituicao set
    nome='Instituto Federal de Educação, Ciência e Tecnologia do Ceará',
    cnpj= '10.744.098/0001-45',
    endereco='Rua Jorge Dumar, Bairro Jardim América, Fortaleza CE',
    cep='60410-426',
    numero='1703',
    telefone='(85) 34012500';
