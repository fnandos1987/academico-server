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
}

module.exports = UserRepository;
