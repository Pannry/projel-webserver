create database projel;
use projel;

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
-- Tabela aluna
create table aluno(
    id int auto_increment primary key,
    nome varchar(32) NOT NULL,
    email varchar(32) NOT NULL,
    senha varchar(64) NOT NULL,
    instituicao_id int,
    foreign key (instituicao_id) references instituicao(id)
);
-- Tabela professor
create table professor(
    id int auto_increment,
    nome varchar(32) NOT NULL,
    endereco varchar(64),
    email varchar(32) NOT NULL,
    senha varchar(64) NOT NULL,
    cpf int,
    cep int,
    numero int,
    telefone int,
    instituicao_id int,
    foreign key (instituicao_id) references instituicao(id),
    primary key (id)
);
-- Tabela da sala
create table sala(
    id int auto_increment,
    nome varchar(32),
    id_professor int,
    semestre varchar(32),
    comentario varchar(1000),
    foreign key (id_professor) references professor(id),
    primary key (id)
);
-- Tabela exercícios
create table exercicios(
    id int auto_increment,
    titulo varchar(100),
    descricao varchar(1500),
    file_path varchar(100),
    id_professor int,
    foreign key (id_professor) references professor(id),
    primary key(id)
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
create table didatico(
    id int auto_increment,
    id_professor int,
    titulo varchar (50),
    descricao varchar (1500),
    file_path varchar (100),    
    foreign key (id_professor) references professor(id),
    primary key(id)
);
-- Tabela de resposta
create table resposta(
    id_aluno int,
    id_exercicios int,
    id_sala int,
    resposta varchar (300),
    pdf_path varchar (100),
    foreign key (id_aluno) references aluno(id),
    foreign key (id_exercicios) references exercicios(id),
    foreign key (id_sala) references sala(id)
    -- primary key(id_aluno, id_exercicios)
);
-- Tabela nota
create table nota(
    id_aluno int,
    id_lista int,
    id_sala int,
    nota float,
    primary key(id_aluno, id_lista, id_sala),
    foreign key(id_aluno) references aluno(id),
    foreign key(id_sala) references sala(id),
    foreign key(id_lista) references lista(id)
);

-- Tabela da lista de exercicios
create table lista_exercicios(
    id_lista int,
    id_exercicios int,
    foreign key (id_lista) references lista(id),
    foreign key (id_exercicios) references exercicios(id),
    primary key(id_lista, id_exercicios)
);
-- Tabela de relacao com a lista de exercicios com a sala
create table sala_lista(
    id_sala int,
    id_lista int,
    foreign key (id_sala) references sala(id),
    foreign key (id_lista) references lista(id),
    primary key (id_sala, id_lista)
);

-- Tabela de relação dos alunos com as salas
create table cursa(
    id_sala int,
    id_aluno int,
    aluno_aceito boolean default false,
    foreign key (id_sala) references sala(id),
    foreign key (id_aluno) references aluno(id),
    primary key (id_sala, id_aluno)
);
-- Inserir dados na tabela instituição
insert into instituicao set
    nome='Instituto Federal de Educação, Ciência e Tecnologia do Ceará',
    cnpj= '10.744.098/0001-45',
    endereco='Rua Jorge Dumar, Bairro Jardim América, Fortaleza CE',
    cep='60410-426',
    numero='1703',
    telefone='(85) 34012500';

insert into aluno set
    nome='a',
    email='a',
    senha='a',
    instituicao_id = 1;
insert into aluno set
    nome='b',
    email='b',
    senha='b',
    instituicao_id = 1;
insert into professor set
    nome='p',
    endereco='p',
    email='p',
    senha='p',
    cpf=1,
    cep=1,
    numero=1,
    telefone=1,
    instituicao_id = 1;
insert into professor set
    nome='q',
    endereco='q',
    email='q',
    senha='q',
    cpf=1,
    cep=1,
    numero=1,
    telefone=1,
    instituicao_id = 1;

insert into exercicios set
    titulo='Exercicio teste 1',
    descricao='Maecenas varius, asd',
    foto='',
    id_professor = 2;
insert into exercicios set
    titulo='Exercicio teste 2',
    descricao='Maecenas varius, asd',
    foto='',
    id_professor = 2;
insert into exercicios set
    titulo='Exercicio teste 3',
    descricao='Maecenas varius, lsd',
    foto='',
    id_professor = 2;
insert into exercicios set
    titulo='Exercicio teste 4',
    descricao='Maecenas varius, asd',
    foto='',
    id_professor = 2;
insert into exercicios set
    titulo='Exercicio teste 5',
    descricao='Maecenas varius, asd',
    foto='',
    id_professor = 2;
insert into exercicios set
    titulo='Exercicio teste 6',
    descricao='Maecenas varius, lsd',
    foto='',
    id_professor = 2;

insert into lista set
    titulo='Lista teste 1',
    id_professor = 2,
    descricao='Maecenas varius, lsd',
    tipo = 'lista';
insert into lista set
    titulo='Lista teste 2',
    id_professor = 2,
    descricao='Maecenas varius, lsd',
    tipo = 'lista';
insert into lista set
    titulo='Lista teste 3',
    id_professor = 2,
    descricao='Maecenas varius, lsd',
    tipo = 'prova';
insert into lista set
    titulo='Lista teste 4',
    id_professor = 2,
    descricao='Maecenas varius, lsd',
    tipo = 'prova';

insert into lista_exercicios set
    id_lista = 1,
    id_exercicios = 1;
insert into lista_exercicios set
    id_lista = 1,
    id_exercicios = 2;
insert into lista_exercicios set
    id_lista = 1,
    id_exercicios = 3;

insert into lista_exercicios set
    id_lista = 2,
    id_exercicios = 6;

insert into lista_exercicios set
    id_lista = 3,
    id_exercicios = 1;
insert into lista_exercicios set
    id_lista = 3,
    id_exercicios = 5;
insert into lista_exercicios set
    id_lista = 3,
    id_exercicios = 6;

insert into lista_exercicios set
    id_lista = 4,
    id_exercicios = 1;
insert into lista_exercicios set
    id_lista = 4,
    id_exercicios = 2;
insert into lista_exercicios set
    id_lista = 4,
    id_exercicios = 3;

insert into sala set
    nome = 'Matemática',
    id_professor = 2,
    semestre = '2012.1',
    comentario = '';
insert into sala set
    nome = 'Fisica',
    id_professor = 2,
    semestre = '2012.2',
    comentario = '';
insert into sala set
    nome = 'Matemática',
    id_professor = 2,
    semestre = '2013.1',
    comentario = '';
