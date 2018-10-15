const sqlite3 = require('sqlite3').verbose();
const Promise = require('bluebird');

class AppDAO {

    /**
     * @param {string} dbFilePath 
     * @constructor
     */
    constructor(dbFilePath) {
        this.db = new sqlite3.Database(dbFilePath, (err) => {
            if (err) {
                console.log('Could not connect to database', err)
            }
        })
    }

    /**
     * Executa instruções insert, update ou delete no banco de dados
     * @param {string} sql 
     * @param {Array} params 
     * @returns Promise
     */
    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err) {
                    reject({ ok: false })
                } else {
                    resolve({ ok: true })
                }
            })
        })
    }

    /**
     * Retorna o primeiro registro da query SQL
     * @param {string} sql 
     * @param {Array} params
     * @returns Promise 
     */
    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, result) => {
                if (err) {                                        
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    /**
     * Retorna todos os registros da query SQL
     * @param {string} sql 
     * @param {Array} params
     * @returns Promise 
     */
    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {                    
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

}

module.exports = AppDAO;
