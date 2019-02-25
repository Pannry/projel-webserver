require('dotenv').config('../.env');
const Conexao = require('../app/infra/banco/dbConnection')();

const con = Conexao();

con.query('USE projel');

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
