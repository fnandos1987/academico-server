class TeacherRepository {
    
    constructor(dao) {
        this.dao = dao
    }

    list() {
        return this.dao.all('select * from professor', []);
    }

    getByName(name) {
        return this.dao.all('select * from professor where nome like ?', ['%'+name+'%']);
    }

    getAllPaged(perPage, page) {
        return this.dao.all('select * from professor limit ? offset ?', [perPage, page])
    }

    getById(id) {
        return this.dao.get('select * from professor where id = ?', [id]);
    }
}

module.exports = TeacherRepository;
