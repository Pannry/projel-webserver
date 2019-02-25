function NotasDAO(conexaoDb) {
  this._conexaoDb = conexaoDb;
}

module.exports = () => NotasDAO;

// Professor

NotasDAO.prototype.criarNotaAlunoSala = function (entrada, callback) {
  this._conexaoDb.query('INSERT INTO nota SET ?', entrada, callback);
};

NotasDAO.prototype.selecionarListas = function (entrada, callback) {
  this._conexaoDb.query(
    ` SELECT 
        id_lista, titulo 
      FROM 
        lista, sala_lista 
      WHERE 
        lista.id = sala_lista.id_lista
        AND id_sala = ?`,
    entrada, callback,
  );
};

NotasDAO.prototype.mostrarNotaAlunoSala = function (entrada, callback) {
  this._conexaoDb.query(
    ` SELECT 
        nota.id_sala, nota.id_aluno, nota.id_lista, nota
      FROM
        cursa
      INNER JOIN
        nota 
          ON cursa.id_aluno = nota.id_aluno
          AND cursa.id_sala = nota.id_sala
          AND cursa.id_aluno = ?
          AND cursa.id_sala = ?`,
    [entrada.id_aluno, entrada.id_sala], callback,
  );
};

NotasDAO.prototype.atualizarNota = function (entrada, callback) {
  this._conexaoDb.query(
    ` UPDATE 
        nota 
      SET 
        nota = ? 
      WHERE 
        id_aluno = ? 
        AND id_lista = ? 
        AND id_sala = ?`,
    [entrada.nota, entrada.id_aluno, entrada.id_lista, entrada.id_sala], callback,
  );
};

// resposta está vinculada ao aluno, e não a sala & aluno.
NotasDAO.prototype.MostrarRespostas = function (entrada, callback) {
  this._conexaoDb.query(
    ` SELECT 
        resposta.id_aluno, 
        resposta.id_sala, 
        resposta.id_exercicios, 
        file_name, 
        titulo, 
        descricao, 
        resposta 
      FROM
        resposta
      INNER JOIN
        lista_exercicios 
          ON resposta.id_exercicios = lista_exercicios.id_exercicios
      INNER JOIN
        exercicios
          ON exercicios.id = lista_exercicios.id_exercicios
          AND id_aluno = ?
          AND id_lista = ? 
          AND id_sala = ?`,
    [entrada.id_aluno, entrada.id_lista, entrada.id_sala], callback,
  );
};
