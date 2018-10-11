class TeacherRepository {
    
    constructor(dao) {
        this.dao = dao
    }

    getByName(name) {
        return this.dao.all('select * from professor where nome like ?', ['%'+name+'%']);
    }

    getById(id) {
        return this.dao.get('select * from professor where id = ?', [id]);
    }
}

module.exports = TeacherRepository;
