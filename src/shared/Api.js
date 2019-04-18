import { } from 'mobx-react'
import { observable, computed, action, toJS } from 'mobx'
import AsyncStorage from '@react-native-community/async-storage'
import client from './Client'
import { auth } from './Stores';
//import stripeApi from './../shared/StripeApi'

class Api {
    @observable cartItems = []
    @observable subtotal = 0
    @observable shippingAmount = 0
    @observable taxAmount = 0
    @observable shipping_id = 2
    @observable tax_id = 1
    @observable order

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

    async createOrder() {
        let data = {
            cart_id: this.cart_id,
            customer_id: auth.customer.customer_id,
            shipping_id: this.shipping_id,
            tax_id: this.tax_id
        }
        this.order = await this.post('orders', data);
    }

    async payNow(data) {
        if(!this.order)
            await this.createOrder()
        console.log(this.order)
        let res = await this.post('stripe​/charge', {
            stripeToken: JSON.stringify(testToken),
            order_id: this.order.orderId,
            description: 'Description',
            amount: this.total,
            currency: 'USD'
        })
        throw 'Not implemented yet'
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
        await this.loadTotal()
    }

    async loadTotal() {
        let res = await this.get(`shoppingcart/totalAmount/${this.cart_id}`)
        this.subtotal = res.total_amount? res.total_amount : 0
    }

    @computed get total() {
        return Math.round((this.subtotal + this.shippingAmount + this.taxAmount) * 100) / 100
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

const testToken = {
    "id": "tok_1EQW1z2eZvKYlo2CgS67rOqB",
    "object": "token",
    "card": {
      "id": "card_1EQW1z2eZvKYlo2CinzTTwbH",
      "object": "card",
      "address_city": null,
      "address_country": null,
      "address_line1": null,
      "address_line1_check": null,
      "address_line2": null,
      "address_state": null,
      "address_zip": null,
      "address_zip_check": null,
      "brand": "Visa",
      "country": "US",
      "cvc_check": null,
      "dynamic_last4": null,
      "exp_month": 8,
      "exp_year": 2020,
      "fingerprint": "Xt5EWLLDS7FJjR1c",
      "funding": "credit",
      "last4": "4242",
      "metadata": {},
      "name": null,
      "tokenization_method": null
    },
    "client_ip": null,
    "created": 1555577743,
    "livemode": false,
    "type": "card",
    "used": false
  }