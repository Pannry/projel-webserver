module.exports = class ExerciciosDao {
  constructor(connection) {
    this.connection = connection;
  }

  retornarExercicios(entrada) {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM exercicios WHERE id_professor = ?', entrada, (err, idProfessor) => {
        if (err) return reject(err);
        resolve(idProfessor);
        return null;
      });
    });
  }
};
