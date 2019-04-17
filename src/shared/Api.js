import { } from 'mobx-react'
import { observable, computed, action, toJS } from 'mobx'
import AsyncStorage from '@react-native-community/async-storage'
import client from './Client'
import { auth } from './Stores';

class Api {
    @observable cartItems = []
    @observable total = 0
    @observable subtotal = 0
    @observable shipping = 0
    @observable tax = 0

    cart_id = null

    async get(url, data) {
        try {
            client.defaults.headers.common['user-key'] = auth.accessToken
            let res = await client.get(url, { params: data })
            client.headers
            return res.data
        }
        catch (e) { this.handleError(e) }
    }

    async post(url, data) {
        try {
            client.defaults.headers.common['user-key'] = auth.accessToken
            let res = await client.post(url, JSON.stringify(data))
            return res.data
        }
        catch (e) { this.handleError(e) }
    }

    async put(url, data) {
        try {
            client.defaults.headers.common['user-key'] = auth.accessToken
            let res = await client.put(url, JSON.stringify(data))
            
        }
        catch (e) { this.handleError(e) }
    }

    async updateCustomer(data) {
        data.email = auth.customer.email
        await this.put('customer', data)
    }

    async updateCustomerAddress(data) {
        await this.put('customers/address', data)
        auth.customer = await this.get('customer')
    }

    async initShoppingCart() {
        this.cart_id = await AsyncStorage.getItem('@cart_id')
        if (!this.cart_id) {
            console.log('not from async storage')
            let res = await this.get('shoppingcart/generateUniqueId')
            this.cart_id = res.cart_id
            await AsyncStorage.setItem('@cart_id', this.cart_id)
        }
        await this.loadShoppingCart()
        await this.loadTotal()
    }

    async loadShoppingCart() {
        let res = await this.get(`shoppingcart/${this.cart_id}`)
        this.cartItems.length = 0
        res.forEach(element => {
            this.cartItems.push(element)
        });
    }

    async loadTotal() {
        let res = await this.get(`shoppingcart/totalAmount/${this.cart_id}`)
        this.subtotal = res.total_amount? res.total_amount : 0
        this.calculateTotal()
    }

    calculateTotal() {
        this.total = Math.round((this.subtotal + this.shipping + this.tax) * 100) / 100
    }

    async addToCart(product_id) {
        let data = {
            cart_id: this.cart_id,
            product_id: product_id,
            attributes: 'none'
        }

        await this.post('shoppingcart/add', data)
        await this.loadShoppingCart()
    }

    handleError(e) {
        let status = e.response.status
        let error = ''
        if(typeof(e) === 'string') {
            alert(e);
        }
        else if (status === 400) {
            error = e.response.data.error.message
        }
        else if (status === 404) {
            error = e.response.data.error
        }
        else {
            console.log(e)
            error = "An unhandled exception has occured"
        }
        alert(error)
        throw error
    }


}

const products = new Api();
export default products;