//MÉTODOS PADRÕES FICARÃO NA BASE
//MÉTODOS ESPECÍFICOS FICARÃO NOS OUTRO ARQUIVOS
//Product.js, User.js, File.js, Category.js herdará do Base.js

const Base = {
    init({ table }) {
        if(!table) throw new Error('Invalid Params')

        //this = objeto Base
        this.table = table

        return this
    },

    async findOne(filters){
        // let query = `SELECT * FROM ${this.table}`

        // Object.keys(filters).map(key => {
        //     //where | OR | and 
        //     query = `${query}
        //     ${key}
        //     `

        //     Object.keys(filters[key]).map(field => {
        //         //cpf = cpf
        //         query = `${query} ${field} = '${filters[key][field]}'`
        //     })
        // })

        // const results = await db.query(query)

        // return results.rows[0]
    }, 
}

module.exports = Base