const { formatPrice } = require('./utils')

//carrinho fica guardado na sessão (req.session)
//carrinho na session = oldCart

const Cart = {
    init(oldCart){
        if(oldCart){
            this.items = oldCart.items //[{ product: {}, price, quantity, formattedPrice}, {}]
            this.total = oldCart.total
        } else {
            this.items = []
            this.total = {
                quantity: 0,
                price: 0,
                formattedPrice: formatPrice(0)
            }
        }

        return this
    },

    //adcionar um item do carrinho
    addOne(product){
        // ver se o produto já existe no carrinho
        let inCart = this.items.find(item => item.product.id == product.id)

        if(!inCart){
            inCart = {
                product: {
                    ...product,
                    formattedPrice: formatPrice(product.price)
                },
                quantity: 0,
                price: 0,
                formattedPrice: formatPrice(0)
            }

            this.items.push(inCart)
        }

        //max quantity exceded
        if(inCart.quantity >= product.quantity) return this

        //ipdate item
        inCart.quantity++
        inCart.price = inCart.product.price * inCart.quantity
        inCart.formattedPrice = formatPrice(inCart.price)


        //update cart
        this.total.quantity++
        this.total.price += inCart.product.price
        this.total.formattedPrice = formatPrice(this.total.price)

        return this
    },


    //remover 1 item do carrinho
    removeOne(productId){},


    //deletar todo o item
    delete(productId){}
}

const product = {
    id: 1,
    price: 199,
    quantity: 2
}

const product2 = {
    id: 2,
    price: 229,
    quantity: 1
}

//Estrutura
// console.log(Cart.init().total)

// Teste
// console.log('add first cart item')
// let oldCart = Cart.init().addOne(product)
// console.log(oldCart)

// console.log('add second cart item')
// oldCart = Cart.init(oldCart).addOne(product)
// console.log(oldCart)

// console.log('add third cart item')
// oldCart = Cart.init(oldCart).addOne(product2)
// console.log(oldCart)

// console.log('add last cart item')
// oldCart = Cart.init(oldCart).addOne(product)
// console.log(oldCart)


module.exports = Cart