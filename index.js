const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();
app.use('/', router);

const AppDAO = require('./dao');
const UserRepository = require('./user_repository');
const TeacherRepository = require('./teacher_repository');

const dao = new AppDAO('./academico.db');
const userRepo = new UserRepository(dao);
const teacherRepo = new TeacherRepository(dao);

router.post('/logar', (req, res) => {
    userRepo
    .getByLogin(req.params.login, req.params.pass)
    .then(user => res.json(user))
    .catch((err) => { res.status(500).json({ error: err.toString() }); });	
});

router.post('/novasenha', (req, res) => {
    userRepo
    .getByEmail(req.params.email)
    .then(user => res.json(user))
    .catch((err) => { res.status(500).json({ error: err.toString() }); });
});

router.get('/buscarprof/:name', (req, res) => {
    teacherRepo
    .getByName(req.params.name)
    .then(teachers => res.json(teachers))
    .catch((err) => { res.status(500).json({ error: err.toString() }); });	
});

app.listen(3000, function () {
    console.log('listen in port 3000')
});