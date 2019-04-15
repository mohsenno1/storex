import { } from 'mobx-react'
import { observable, computed, action, toJS } from 'mobx'
import AsyncStorage from '@react-native-community/async-storage'
import client from './Client'
import { auth } from './Stores';

class Api {
    @observable cartItems = []
    cart_id

    async get(url, data) {
        try {
            //data.accessToken = auth.accessToken
            let res = await client.get(url, { params: data })
            return res.data
        }
        catch (e) { this.handleError(e) }
    }

    async post(url, data) {
        try {
            //data.accessToken = auth.accessToken
            let res = await client.post(url, JSON.stringify(data))
            return res.data
        }
        catch (e) { this.handleError(e) }
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
    }

    async loadShoppingCart() {
        let res = await this.get(`shoppingcart/${this.cart_id}`)
        this.cartItems.length = 0
        res.forEach(element => {
            this.cartItems.push(element)
        });
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
    }


}

const products = new Api();
export default products;