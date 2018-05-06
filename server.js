var app = require('./config/express')();

app.listen(app.get('port'), () => {
    console.log(`servidor rodando na porta ${app.get('port')}`);
});