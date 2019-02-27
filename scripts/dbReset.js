require('dotenv').config('../.env');
const Conexao = require('./conn')();

const con = Conexao();

con.query('DROP DATABASE IF EXISTS projel');
con.query('CREATE DATABASE projel');
con.end();
