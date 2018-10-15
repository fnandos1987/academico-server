class UserRepository {
    
    constructor(dao) {
        this.dao = dao
    }

    getByEmail(email) {
        return this.dao.get('select * from usuario where email = ?', [email]);
    }

    getByLogin(login, pass) {
        return this.dao.get('select * from usuario where login = ? and senha = ?', [login, pass]);
    }

    updateUser(id, name, language) {
        return this.dao.run('update usuario set nome = ?, idioma = ? where id = ?', [name, language, id]);
    }
}

module.exports = UserRepository;
