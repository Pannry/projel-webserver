const UsuarioDAO = require('./banco/UsuarioDAO');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const passport = require('passport');

passport.serializeUser((user, done) => {
  const chave = {
    id: user.id,
    tipo: user.tipo,
  };
  done(null, chave);
});

passport.deserializeUser(async (usuario, done) => {
  const savedUser = new UsuarioDAO();
  if (usuario.tipo === 'aluno') {
    const result = await savedUser.findAluno({ id: usuario.id });
    const user = { id: result[0].id, email: result[0].email, nome: result[0].nome };
    user.tipo = 'aluno';
    done(null, user);
  } else if (usuario.tipo === 'professor') {
    const result = await savedUser.findProfessor({ id: usuario.id });
    const user = { id: result[0].id, email: result[0].email, nome: result[0].nome };
    user.tipo = 'professor';
    done(null, user);
  }
});

//   /**
//    * Aluno
//    */

//   // Login
passport.use('local-login-aluno', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'senha',
    passReqToCallback: true,
  },
  async (req, username, password, done) => {
    const entrada = { email: username, senha: password };

    const findUser = new UsuarioDAO();
    const result = await findUser.findAluno({ email: entrada.email });

    if (!result.length) {
      return done(null, false, req.flash('loginMessage', 'Oops! Email ou senha não encontrado, tente novamente.'));
    }

    if (!bcrypt.compareSync(entrada.senha, result[0].senha)) {
      return done(null, false, req.flash('loginMessage', 'Oops! Email ou senha não encontrado, tente novamente.'));
    }

    const user = result;
    user[0].tipo = 'aluno';
    return done(null, user[0]);
  },
));

// Cadastro
passport.use('local-signup-aluno', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'senha',
    passReqToCallback: true,
  },
  async (req, username, password, done) => {
    const entrada = {
      email: username,
      senha: password,
    };

    const newUser = {
      email: username,
      instituicao_id: req.body.instituicao_id,
      nome: req.body.nome,
    };

    const user = {};


    const findUser = new UsuarioDAO();
    const result = await findUser.findAluno({ email: entrada.email });

    if (result.length) {
      return done(null, false, req.flash('signupMessage', 'Email não disponivel'));
    }

    if (!result.length) {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(entrada.senha, salt);
      newUser.senha = hash;

      const saveUser = new UsuarioDAO();
      const alunoDB = await saveUser.createAluno(newUser);

      user.id = alunoDB.insertId;
      user.tipo = 'aluno';
      return done(null, user);
    }
    return null;
  },
));

// Login
passport.use('local-login-professor', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'senha',
    passReqToCallback: true,
  },
  async (req, username, password, done) => {
    const entrada = { email: username, senha: password };

    const findUser = new UsuarioDAO();
    const result = await findUser.findProfessor({ email: entrada.email });

    // TODO: Erro
    // if (!result){
    //   return Error
    // }

    if (!result.length) {
      return done(null, false, req.flash('loginMessage', 'Oops! Email ou senha não encontrado, tente novamente.'));
    }
    if (!bcrypt.compareSync(entrada.senha, result[0].senha)) {
      return done(null, false, req.flash('loginMessage', 'Oops! Email ou senha não encontrado, tente novamente.'));
    }

    const user = result;
    user[0].tipo = 'professor';
    return done(null, user[0]);
  },
));

// Cadastro
passport.use('local-signup-professor', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'senha',
    passReqToCallback: true,
  },
  async (req, username, password, done) => {
    const entrada = {
      email: username,
      senha: password,
    };

    const newUser = {
      email: username,
      instituicao_id: req.body.instituicao_id,
      nome: req.body.nome,
      endereco: req.body.endereco,
      cpf: req.body.cpf,
      cep: req.body.cep,
      numero: req.body.numero,
      telefone: req.body.telefone,
    };

    const user = {};

    const findUser = new UsuarioDAO();
    const result = await findUser.findProfessor({ email: entrada.email });

    if (result.length) {
      return done(null, false, req.flash('signupMessage', 'Email não disponivel'));
    }

    if (!result.length) {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(entrada.senha, salt);
      newUser.senha = hash;

      const saveUser = new UsuarioDAO();
      const profDB = await saveUser.createProfessor(newUser);

      if (!profDB) {
        return done(null, false, req.flash('signupMessage', 'Algum campo foi digitado indevidamente'));
      }

      user.id = profDB.insertId;
      user.tipo = 'professor';
      return done(null, user);
    }
    return null;
  },
));

// sites relacionados com multiplas 'local-strategy'

// https://stackoverflow.com/questions/40411236/authorization-for-multiple-local-strategies-in-passportjs-using-mongodb-and-node
// https://stackoverflow.com/questions/36102524/passport-js-multiple-local-strategies-and-req-user
// https://stackoverflow.com/questions/20052617/use-multiple-local-strategies-in-passportjs
// https://github.com/jaredhanson/passport/issues/50
// https://www.wlaurance.com/2018/09/async-await-passportjs-local-strategy/
