const { formatPrice } = require('./utils')

//carrinho fica guardado na sessão (req.session)
//carrinho na session = oldCart

const Cart = {
    init(oldCart){
        if(oldCart){
            this.items = oldCart.items
            this.total = oldCart.total
        } else {
            this.items = []
            this.total = {
                quantiy: 0,
                price: 0,
                formattedPrice: formatPrice(0)
            }
        }

        return this
    },

    //adcionar um item do carrinho
    addOne(product){},


    //remover 1 item do carrinho
    removeOne(productId){},


    //deletar todo o item
    delete(productId){}
}

module.exports = Cart