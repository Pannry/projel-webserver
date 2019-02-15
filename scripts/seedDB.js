require('dotenv').config('../.env');
const Conexao = require('../app/infra/banco/dbConnection')();

const con = Conexao()

con.query(`USE projel`);

// con.query(`
// insert into instituicao set
//     nome='Instituto Federal de Educação, Ciência e Tecnologia do Ceará',
//     cnpj= '10.744.098/0001-45',
//     endereco='Rua Jorge Dumar, Bairro Jardim América, Fortaleza CE',
//     cep='60410-426',
//     numero='1703',
//     telefone='(85) 34012500';
// `);
con.query(`
insert into instituicao set
    nome='Universidade Estadual do Ceará',
    cnpj= '07.885.809/0001-97',
    endereco='Av. Dr. Silas Munguba, Fortaleza CE',
    cep='60740-000',
    numero='1700',
    telefone='(85) 31019610';
`);
con.query(`
INSERT INTO aluno (
        id, nome, email, senha, instituicao_id
    ) 
    VALUES (
        1, 'a', 'a', '$2b$10$qDlv3qheyfGS2mrT/5ykjORUbVCnOdxsvbMzz21hwV/nSoUpu3Qg.', 1
    );
`);

con.query(`
INSERT INTO professor (
        id, nome, endereco, email, senha, cpf, cep, numero, telefone, instituicao_id
    ) 
    VALUES (
        1, 'q', 'q', 'q', '$2b$10$UHAmC6vDL7Ly9uGP8QKrQehVZzFiky6yTOocgWftm8ng6UPGlCe7y', 1, 1, 1, 1, 1
    );

`);




console.log('Success: Database seeded!');
con.end();