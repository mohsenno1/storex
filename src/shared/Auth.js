import { } from 'mobx-react'
import { observable, computed, action, toJS } from 'mobx'
import AsyncStorage from '@react-native-community/async-storage'
import client from './Client'

class Auth {
    @observable showWelcomPages = true
    @observable isAppLoading = true
    @observable isAuthenticated = false
    @observable customer = {email: 'a@a.com'}

    accessToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6MjUsIm5hbWUiOiJhICIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTU1NTA4NzQ0MCwiZXhwIjoxNTU1MTczODQwfQ.YknJxSRJv7Ykz5XWWGnlOTVl8d3oW-rfs-4Q8atudWE'
    expiresIn = null

    @computed get customerAddress() {
        const c = this.customer
        if(!c) return ''
        return `${c.address_1}, ${c.address_2}, ${c.city}, ${c.region}, ${c.country} ${c.postal_code}`
    }

    async signIn(data) {
        try {
            let res = await client.post('customers/login', JSON.stringify(data))
            this.customer = res.data.user
            this.accessToken = res.data.accessToken
            this.expiresIn = res.data.expiresIn
            this.isAuthenticated = true
            console.log(this.accessToken)
            return 'Success'
        }
        catch (e) {
            let status = e.response.status
            if (status === 400) {
                return e.response.data.error.message
            }
            else {
                return "An unhandled exception has occurred"
            }
        }
    }

    async signUp(data) {
        try {
            let res = await client.post('customers', JSON.stringify(data))
            this.customer = res.data.customer
            this.accessToken = res.data.accessToken
            this.expiresIn = res.data.expiresIn
            this.isAuthenticated = true
            console.log(this.customer)
            return 'Success'
        }
        catch (e) {
            let status = e.response.status
            if (status === 400) {
                return e.response.data.error.message
            }
            else {
                return "An unhandled exception has occured"
            }
        }

    }

    async loadApp() {
        try {
            this.showWelcomPages = (await AsyncStorage.getItem('@showWelcomPages') !== 'false')
        }
        catch (e) {
            console.log(e)
        }
        this.isAppLoading = false;
    }

}

const auth = new Auth();
export default auth;