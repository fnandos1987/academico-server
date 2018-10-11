const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router);
app.use(express.static(__dirname + '/public'));

const AppDAO = require('./dao');
const UserRepository = require('./user_repository');
const TeacherRepository = require('./teacher_repository');
const ClassRepository = require('./class_repository');

const dao = new AppDAO('./academico.db');
const userRepo = new UserRepository(dao);
const teacherRepo = new TeacherRepository(dao);
const classRepo = new ClassRepository(dao);


router.post('/logar', (req, res) => {
    userRepo
    .getByLogin(req.params.login, req.params.pass)
    .then(user => res.status(200).json(user.id))
    .catch((err) => { res.status(500).json({ error: err.toString() }); });
});

router.post('/novasenha', (req, res) => {
    userRepo
    .getByEmail(req.body.email)
    .then(user => res.json(user))
    .catch((err) => { res.status(500).json({ error: err.toString() }); });
});

router.get('/professor/buscar/:name', (req, res) => {
    teacherRepo
    .getByName(req.params.name)
    .then(teachers => res.json(teachers))
    .catch((err) => { res.status(500).json({ error: err.toString() }); });	
});

app.listen(3000, function () {
    console.log('listen in port 3000')
});
