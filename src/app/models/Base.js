const { create } = require("browser-sync")
//MÉTODOS PADRÕES FICARÃO NA BASE
//MÉTODOS ESPECÍFICOS FICARÃO NOS OUTRO ARQUIVOS
//Product.js, User.js, File.js, Category.js herdará do Base.js

const db = require("../../config/db")
const { delete } = require("./File")

const Base = {
    init({ table }) {
        if(!table) throw new Error('Invalid Params')

        //this = objeto Base
        this.table = table

        return this
    },

    async findOne(filters){
        let query = `SELECT * FROM ${this.table}`

        Object.keys(filters).map(key => {
            //where | OR | and 
            query = `${query}
            ${key}
            `

            Object.keys(filters[key]).map(field => {
                //cpf = cpf
                query = `${query} ${field} = '${filters[key][field]}'`
            })
        })

        const results = await db.query(query)

        return results.rows[0]
    },

    async create(fields){
        //EXEMPLO:  User.create({ name: 'Mayk' }) 
        // User.create({ key: fields[key] })
        try {
            let keys = [],
                values = []


            Object.keys(fields).map(key => {
                //key
                //name, age, address
                
                keys.push(key)
                values.push(fields[key])

                //values
                //'Valeska', '30', 'Rua algumas coisa'
            })

            const query = `INSERT INTO ${this.table} (${keys.join(',')})
                VALUES (${values.join(',')})
                RETURNING id
            `

            const results = await db.query(query)
            return results.rows[0].id

        } catch(err){
            console.error(err)
        }
    },

    update(id, fields) {
        try {
            let update = []

            Object.keys(fields).map(key => {
                // category_id = ($1)
                const line = `${key} = '${fields[key]}'`
                update.push(line)

            })
    
            let query = `UPDATE ${this.table} SET
                ${update.join(',')} WHERE id = ${id}
            `
        
            db.query(query)
        
            return

        } catch (err) {
            console.error(err)
        }
        
    },

    delete(id) {
        return db.query('DELETE FROM products WHERE id = $1', [id])
    }
    
     
}

module.exports = Base