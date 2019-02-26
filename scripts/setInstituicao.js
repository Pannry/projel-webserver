require('dotenv').config('../.env');
const cp = require('child_process');

const SetInstituicoes = `mysql -u ${process.env.DB_USER} -p${process.env.DB_PASSWORD} < .\\config\\SetUpSqlInstituicoes.sql`;
cp.exec(SetInstituicoes, () => {});
