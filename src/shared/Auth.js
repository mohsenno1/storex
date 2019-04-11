import { } from 'mobx-react'
import { observable, computed, action, toJS } from 'mobx'
import AsyncStorage from '@react-native-community/async-storage'
import client from './Client'

class Auth {
    @observable showWelcomPages = true
    @observable isAppLoading = true

    user
    accessToken
    expiresIn

    async signIn(data) {
        let res = await client.post('customers/login', JSON.stringify(data))
        console.log(res.data)
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