const express = require('express');
const {
  getCreate, postCreate,
  getLogin, postLogin,
  getProfile, getUpdateProfile,
} = require('../controllers/professor/Profile');

const {
  getClassrooms,
  getCreateClassroom, postCreateClassroom,
  getOpenClassroomStudentList, IncludeStudentInClassroom,
  getOpenClassroomDetails, postCommentInDetails,
  getIncludeExerciseList, postIncludeExerciseList,
  getIncludeDidacticList, postIncludeDidacticList,
  deleteClassroom,
} = require('../controllers/professor/Classroom');

const {
  getExercises,
} = require('../controllers/professor/Exercicios/Exercise');

const router = express.Router();

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
  return 0;
}

// @Profile
router
  .route('/cadastro')
  .get(getCreate)
  .post(postCreate);

router
  .route('/login')
  .get(getLogin)
  .post(postLogin);

router
  .route('/profile')
  .get(checkAuth, getProfile);

router
  .route('/profile/update')
  .get(checkAuth, getUpdateProfile);

// @Classroom.js
router
  .route('/turmas')
  .get(checkAuth, getClassrooms);

router
  .route('/turmas/criar')
  .get(checkAuth, getCreateClassroom)
  .post(checkAuth, postCreateClassroom);

router
  .route('/turma/abrir/:id/professor')
  .get(checkAuth, getOpenClassroomStudentList)
  .post(checkAuth, IncludeStudentInClassroom);

router
  .route('/turma/abrir/:id/aluno')
  .get(checkAuth, getOpenClassroomDetails)
  .post(checkAuth, postCommentInDetails);

// TODO: rota abaixo
router
  .route('/turma/abrir/:id/aluno/incluirlista')
  .get(checkAuth, getIncludeExerciseList)
  .post(checkAuth, postIncludeExerciseList);

// TODO: rota abaixo
router
  .route('/turma/abrir/:id/aluno/incluirDidatico')
  .get(checkAuth, getIncludeDidacticList)
  .post(checkAuth, postIncludeDidacticList);

// TODO: testar .put e .delete
router
  .route('/turmas/excluir/:id')
  .get(checkAuth, deleteClassroom);

// @Exercise.js
router
  .route('/exercicios')
  .get(checkAuth, getExercises);


module.exports = function (app) {
  app.use('/professor', router);
};

const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'app/uploads/',
  filename(req, file, cb) {
    cb(null, `${Date.now().toString().substring(5, 13)}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// module.exports = (app) => {
//   const { Profile } = app.controllers.professor;
//   const { Turmas } = app.controllers.professor;
//   const { Exercicios } = app.controllers.professor;
//   const { Notas } = app.controllers.professor;
//   const { Didatico } = app.controllers.professor;

//   app.get('/professor', (req, res) => {
//     (req.user === undefined) ?
//       res.render('professor/home', { accountType: '' }) :
//       res.render('professor/home', { accountType: req.user.tipo });
//   });



//   // 

//   app.route('/professor/turmas/criar')
//     .get(checkAuth, Turmas.TurmaCriar.get)
//     .post(checkAuth, Turmas.TurmaCriar.post);

//   app.route('/professor/turma/abrir/:id/professor')
//     .get(checkAuth, Turmas.TurmaAbrir.professorGET)
//     .post(checkAuth, Turmas.TurmaAbrir.autenticarAlunoNaTurma);

//   app.route('/professor/turma/abrir/:id/aluno')
//     .get(checkAuth, Turmas.TurmaAbrir.alunoGET)
//     .post(checkAuth, Turmas.TurmaAbrir.comentario);

//   app.route('/professor/turma/abrir/:id/aluno/incluirlista')
//     .get(checkAuth, Turmas.TurmaIncluirLista.get)
//     .post(checkAuth, Turmas.TurmaIncluirLista.post);

//   app.route('/professor/turma/abrir/:id/aluno/incluirDidatico')
//     .get(checkAuth, Turmas.TurmaIncluirDidatico.get)
//     .post(checkAuth, Turmas.TurmaIncluirDidatico.post);

//   app.route('/professor/turmas/excluir/:id')
//     .get(checkAuth, Turmas.TurmaExcluir.delete);

//   // Exercicios

//   // Questões
//   app.route('/professor/profile/exercicios')
//     .get(checkAuth, Exercicios.Exercicios.get);

//   app.route('/professor/exercicios/abrir/:id')
//     .get(checkAuth, Exercicios.ExerciciosAbrir.get);

//   app.route('/professor/exercicios/excluir/:id')
//     .get(checkAuth, Exercicios.ExerciciosExcluir.delete);

//   app.route('/professor/exercicios/criar')
//     .get(checkAuth, Exercicios.ExerciciosCriar.get)
//     .post(checkAuth, upload.array('fileUpload', 5), Exercicios.ExerciciosCriar.post);

//   app.route('/professor/exercicios/abrir/:id_exercicio/download/:file_name')
//     .get(checkAuth, Exercicios.ExerciciosDownloadProfessor.get);


//   // Listas
//   app.route('/professor/profile/exercicios/lista')
//     .get(checkAuth, Exercicios.Listas.get);

//   app.route('/professor/exercicios/lista/criar')
//     .get(checkAuth, Exercicios.ListasCriar.get)
//     .post(checkAuth, Exercicios.ListasCriar.post);

//   app.route('/professor/exercicios/lista/excluir/:id')
//     .get(checkAuth, Exercicios.ListasExcluir.delete);

//   app.route('/professor/exercicios/lista/abrir/:id/info')
//     .get(checkAuth, Exercicios.ListasAbrir.mostrarInformacoes);

//   app.route('/professor/exercicios/lista/abrir/:id/questoes')
//     .get(checkAuth, Exercicios.ListasAbrir.mostrarQuestoes);

//   app.route('/professor/exercicios/lista/abrir/:id/editar')
//     .get(checkAuth, Exercicios.ListasAdicionarExercicios.get)
//     .post(checkAuth, Exercicios.ListasAdicionarExercicios.post);

//   // Nota

//   app.route('/professor/turma/abrir/:id_sala/professor/:id_aluno')
//     .get(checkAuth, Notas.Notas.professorGET);

//   app.route('/professor/turma/abrir/:id_sala/professor/:id_aluno/:id_lista')
//     .get(checkAuth, Notas.Notas.verRespostas)
//     .post(checkAuth, Notas.Notas.post);

//   // MATERIAL DIDATICO

//   app.route('/professor/profile/didatico')
//     .get(checkAuth, Didatico.DidaticoPainel.get);

//   app.route('/professor/didatico/excluir/:id')
//     .get(checkAuth, Didatico.DidaticoExcluir.delete);

//   app.route('/professor/profile/didatico/criar')
//     .get(checkAuth, Didatico.DidaticoCriar.get)
//     .post(checkAuth, upload.array('fileUpload', 5), Didatico.DidaticoCriar.post);

//   app.route('/professor/didatico/abrir/:id/download/:path')
//     .get(checkAuth, Didatico.DidaticoDownload.get);

//   app.route('/professor/didatico/abrir/:id/')
//     .get(checkAuth, Didatico.DidaticoAbrir.get);
// };
