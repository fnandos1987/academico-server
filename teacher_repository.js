class TeacherRepository {
    
    constructor(dao) {
        this.dao = dao
    }

    getByName(name) {
        return this.dao.all('select * from professor where nome like ?', ['%'+name+'%']);
    }
}

module.exports = TeacherRepository;
