require('dotenv').config('../.env');
const cp = require('child_process');

const setTables = `mysql -u ${process.env.DB_USER} -p${process.env.DB_PASSWORD} < .\\config\\SetUpSqlTables.sql`;
cp.exec(setTables, () => {});
