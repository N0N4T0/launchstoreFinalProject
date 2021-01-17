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

        //update item
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
    removeOne(productId){
        //pegar o item do carrinho
        const inCart = this.items.find(item => item.product.id == productId)

        if(!inCart) return this

        // atualizar o item
        inCart.quantity--
        inCart.price = inCart.product.price * inCart.quantity
        inCart.formattedPrice = formatPrice(inCart.price)


        //atualizar o carrinho
        this.total.quantity--
        this.total.price -= inCart.product.price
        this.total.formattedPrice = formatPrice(this.total.price)

        if(inCart.quantity < 1){
            // Primeira opção de remoção
            // const itemIndex = this.items.indexOf(inCart)
            // this.items.splice(itemIndex, 1)

            this.items.filter(item => item.product.id != inCart.product.id)            

            return this
        }

        return this
    },


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


console.log('remove one item')
oldCart = Cart.init(oldCart).removeOne(product.id)
console.log(oldCart)

console.log('remove one item')
oldCart = Cart.init(oldCart).removeOne(product.id)
console.log(oldCart)


module.exports = Cart