-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.10-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              10.2.0.5599
-- Date:                         16 december 2019
-- --------------------------------------------------------

-- Copiando estrutura para tabela projel.instituicao
CREATE TABLE IF NOT EXISTS `instituicao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) DEFAULT NULL,
  `cnpj` varchar(32) DEFAULT NULL,
  `endereco` varchar(64) DEFAULT NULL,
  `cep` varchar(32) DEFAULT NULL,
  `numero` varchar(32) DEFAULT NULL,
  `telefone` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela projel.instituicao: ~1 rows (aproximadamente)
INSERT INTO `instituicao` (`id`, `nome`, `cnpj`, `endereco`, `cep`, `numero`, `telefone`) VALUES
	(1, 'Universidade Estadual do Ceará', '07.885.809/0001-97', 'Av. Dr. Silas Munguba, Fortaleza CE', '60740-000', '1700', '(85) 31019610');


-- Copiando estrutura para tabela projel.professor
CREATE TABLE IF NOT EXISTS `professor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `endereco` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(200) NOT NULL,
  `cpf` varchar(30) DEFAULT NULL,
  `cep` varchar(30) DEFAULT NULL,
  `numero` varchar(30) DEFAULT NULL,
  `telefone` varchar(30) DEFAULT NULL,
  `instituicao_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `instituicao_id` (`instituicao_id`),
  CONSTRAINT `professor_ibfk_1` FOREIGN KEY (`instituicao_id`) REFERENCES `instituicao` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Copiando estrutura para tabela projel.sala
CREATE TABLE IF NOT EXISTS `sala` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_professor` int(11) DEFAULT NULL,
  `nome` varchar(32) DEFAULT NULL,
  `semestre` varchar(32) DEFAULT NULL,
  `cod_sala` varchar(20) NOT NULL,
  `comentario` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_professor` (`id_professor`),
  CONSTRAINT `sala_ibfk_1` FOREIGN KEY (`id_professor`) REFERENCES `professor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando estrutura para tabela projel.aluno
CREATE TABLE IF NOT EXISTS `aluno` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(32) NOT NULL,
  `email` varchar(32) NOT NULL,
  `email_validado` varchar(5) DEFAULT NULL,
  `senha` varchar(128) NOT NULL,
  `instituicao_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `instituicao_id` (`instituicao_id`),
  CONSTRAINT `aluno_ibfk_1` FOREIGN KEY (`instituicao_id`) REFERENCES `instituicao` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando estrutura para tabela projel.cursa
CREATE TABLE IF NOT EXISTS `cursa` (
  `id_sala` int(11) NOT NULL,
  `id_aluno` int(11) NOT NULL,
  `aluno_aceito` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id_sala`,`id_aluno`),
  KEY `id_aluno` (`id_aluno`),
  CONSTRAINT `cursa_ibfk_1` FOREIGN KEY (`id_sala`) REFERENCES `sala` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cursa_ibfk_2` FOREIGN KEY (`id_aluno`) REFERENCES `aluno` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando estrutura para tabela projel.didatico
CREATE TABLE IF NOT EXISTS `didatico` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_professor` int(11) DEFAULT NULL,
  `titulo` varchar(50) DEFAULT NULL,
  `descricao` varchar(1500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_professor` (`id_professor`),
  CONSTRAINT `didatico_ibfk_1` FOREIGN KEY (`id_professor`) REFERENCES `professor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando estrutura para tabela projel.didatico_material
CREATE TABLE IF NOT EXISTS `didatico_material` (
  `id` int(11) DEFAULT NULL,
  `file_name` varchar(1000) DEFAULT NULL,
  KEY `id` (`id`),
  CONSTRAINT `didatico_material_ibfk_1` FOREIGN KEY (`id`) REFERENCES `didatico` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando estrutura para tabela projel.exercicios
CREATE TABLE IF NOT EXISTS `exercicios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_professor` int(11) DEFAULT NULL,
  `titulo` varchar(100) DEFAULT NULL,
  `descricao` varchar(1500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_professor` (`id_professor`),
  CONSTRAINT `exercicios_ibfk_1` FOREIGN KEY (`id_professor`) REFERENCES `professor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando estrutura para tabela projel.exercicios_material
CREATE TABLE IF NOT EXISTS `exercicios_material` (
  `id` int(11) DEFAULT NULL,
  `file_name` varchar(1000) DEFAULT NULL,
  KEY `id` (`id`),
  CONSTRAINT `exercicios_material_ibfk_1` FOREIGN KEY (`id`) REFERENCES `exercicios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando estrutura para tabela projel.lista
CREATE TABLE IF NOT EXISTS `lista` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_professor` int(11) DEFAULT NULL,
  `titulo` varchar(32) DEFAULT NULL,
  `descricao` varchar(1500) DEFAULT NULL,
  `tipo` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_professor` (`id_professor`),
  CONSTRAINT `lista_ibfk_1` FOREIGN KEY (`id_professor`) REFERENCES `professor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando estrutura para tabela projel.lista_exercicios
CREATE TABLE IF NOT EXISTS `lista_exercicios` (
  `id_lista` int(11) NOT NULL,
  `id_exercicios` int(11) NOT NULL,
  PRIMARY KEY (`id_lista`,`id_exercicios`),
  KEY `id_exercicios` (`id_exercicios`),
  CONSTRAINT `lista_exercicios_ibfk_1` FOREIGN KEY (`id_lista`) REFERENCES `lista` (`id`) ON DELETE CASCADE,
  CONSTRAINT `lista_exercicios_ibfk_2` FOREIGN KEY (`id_exercicios`) REFERENCES `exercicios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando estrutura para tabela projel.nota
CREATE TABLE IF NOT EXISTS `nota` (
  `id_aluno` int(11) NOT NULL,
  `id_lista` int(11) NOT NULL,
  `id_sala` int(11) NOT NULL,
  `nota` float DEFAULT NULL,
  PRIMARY KEY (`id_aluno`,`id_lista`,`id_sala`),
  KEY `id_sala` (`id_sala`),
  KEY `id_lista` (`id_lista`),
  CONSTRAINT `nota_ibfk_1` FOREIGN KEY (`id_aluno`) REFERENCES `aluno` (`id`),
  CONSTRAINT `nota_ibfk_2` FOREIGN KEY (`id_sala`) REFERENCES `sala` (`id`) ON DELETE CASCADE,
  CONSTRAINT `nota_ibfk_3` FOREIGN KEY (`id_lista`) REFERENCES `lista` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Copiando estrutura para tabela projel.resposta
CREATE TABLE IF NOT EXISTS `resposta` (
  `id_aluno` int(11) DEFAULT NULL,
  `id_exercicios` int(11) DEFAULT NULL,
  `id_sala` int(11) DEFAULT NULL,
  `resposta` varchar(300) DEFAULT NULL,
  `file_name` varchar(100) DEFAULT NULL,
  KEY `id_aluno` (`id_aluno`),
  KEY `id_exercicios` (`id_exercicios`),
  KEY `id_sala` (`id_sala`),
  CONSTRAINT `resposta_ibfk_1` FOREIGN KEY (`id_aluno`) REFERENCES `aluno` (`id`),
  CONSTRAINT `resposta_ibfk_2` FOREIGN KEY (`id_exercicios`) REFERENCES `exercicios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `resposta_ibfk_3` FOREIGN KEY (`id_sala`) REFERENCES `sala` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Copiando estrutura para tabela projel.sala_didatico
CREATE TABLE IF NOT EXISTS `sala_didatico` (
  `id_sala` int(11) NOT NULL,
  `id_didatico` int(11) NOT NULL,
  PRIMARY KEY (`id_sala`,`id_didatico`),
  KEY `id_didatico` (`id_didatico`),
  CONSTRAINT `sala_didatico_ibfk_1` FOREIGN KEY (`id_sala`) REFERENCES `sala` (`id`) ON DELETE CASCADE,
  CONSTRAINT `sala_didatico_ibfk_2` FOREIGN KEY (`id_didatico`) REFERENCES `didatico` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando estrutura para tabela projel.sala_lista
CREATE TABLE IF NOT EXISTS `sala_lista` (
  `id_sala` int(11) NOT NULL,
  `id_lista` int(11) NOT NULL,
  PRIMARY KEY (`id_sala`,`id_lista`),
  KEY `id_lista` (`id_lista`),
  CONSTRAINT `sala_lista_ibfk_1` FOREIGN KEY (`id_sala`) REFERENCES `sala` (`id`) ON DELETE CASCADE,
  CONSTRAINT `sala_lista_ibfk_2` FOREIGN KEY (`id_lista`) REFERENCES `lista` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;