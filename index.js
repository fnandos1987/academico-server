const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');

const router = express.Router();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/imgs');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });
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

router.get('/professor/buscar/:name', (req, res) => {
    teacherRepo
    .getByName(req.params.name)
    .then((teachers) => res.status(200).json(teachers))
    .catch((err) => res.status(500).json({ error: err.toString() }));
});

router.get('/professor/listar/:page', (req, res) => {
    teacherRepo
    .getAllPaged(10, req.params.page * 10)
    .then((teachers) => res.status(200).json(teachers))
    .catch((err) => res.status(500).json({ error: err.toString() }));
});

router.get('/professor/:id', (req, res) => {
    teacherRepo
    .getById(req.params.id)
    .then((teachers) => res.status(200).json(teachers))
    .catch((err) => res.status(500).json({ error: err.toString() }));
});

router.post('/file/upload', upload.single('file'),
    (req, res) => res.status(200).send('<h2>Upload realizado com sucesso</h2>'));

app.listen(3000, function () {
    console.log('listen in port 3000')
});
