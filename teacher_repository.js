class TeacherRepository {
    
    constructor(dao) {
        this.dao = dao
    }

    list() {
        return this.dao.all('select * from professor', []);
    }

    insert(professor) {
        let sql = 'insert into professor (id, nome, data_nascto, foto, curriculo, status) values (?, ?, ?, ?, ?, ?)';
        let data = [professor.id, professor.nome, professor.data_nascto, professor.foto, professor.curriculo, professor.status];
        return this.dao.run(sql, data);
    }

    update(professor) {
        let sql = 'update professor set nome = ?, data_nascto = ?, curriculo = ?, status = ? where id = ?';
        let data = [professor.nome, professor.data_nascto, professor.curriculo, professor.status, professor.id];
        return this.dao.run(sql, data);
    }

    delete(id) {
        let sql = 'delete from professor where id = ?';
        return this.dao.run(sql, [id]);
    }
}

module.exports = TeacherRepository;
