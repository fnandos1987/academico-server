const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router);

app.use(express.static(__dirname + '/public'));

const AppDAO = require('./dao');
const UserRepository = require('./user_repository');
const TeacherRepository = require('./teacher_repository');

const dao = new AppDAO('./academico.db');
const userRepo = new UserRepository(dao);
const teacherRepo = new TeacherRepository(dao);

router.post('/usuario/logar', (req, res) => {
    userRepo
    .getByLogin(req.body.login, req.body.pass)
    .then((user) => res.status(200).json(user != undefined ? user.id : false))
    .catch((err) => res.status(500).json({ error: err.toString() }));
});

router.post('/usuario/novasenha', (req, res) => {
    userRepo
    .getByEmail(req.body.email)
    .then((user) => res.status(200).json(user != undefined))
    .catch((err) => res.status(500).json({ error: err.toString() }));
});

router.put('/usuario/alterar', (req, res) => {
    userRepo
    .updateUser(req.body.id, req.body.nome, req.body.idioma)
    .then((ret) => res.status(200).json(ret.ok))
    .catch((err) => res.status(500).json({ error: err.toString() }));
});

router.get('/professor', (req, res) => {
    teacherRepo
    .list()
    .then((teachers) => res.status(200).json(teachers))
    .catch((err) => res.status(500).json({ error: err.toString() }));
});

router.post('/professor/novo', (req, res) => {
    teacherRepo
    .insert(req.params.professor)
    .then((ok) => res.status(200).json(ok))
    .catch((err) => res.status(500).json(err));
});

router.put('/professor/alterar', (req, res) => {
    teacherRepo
    .update(req.params.professor)
    .then((ok) => res.status(200).json(ok))
    .catch((err) => res.status(500).json(err));
});

router.delete('/professor/delete/:id', (req, res) => {
    teacherRepo
    .delete(req.params.id)
    .then((ok) => res.status(200).json(ok))
    .catch((err) => res.status(500).json(err));
});

app.listen(3000, function () {
    console.log('listen in port 3000')
});
