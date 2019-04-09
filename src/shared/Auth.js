import { } from 'mobx-react'
import { observable, computed, action, toJS } from 'mobx'
import AsyncStorage from '@react-native-community/async-storage'

class Auth {
    @observable showWelcomPages = true
    @observable isAppLoading = true

    async loadApp() {
        try {
            this.showWelcomPages = (await AsyncStorage.getItem('@showWelcomPages') != 'false')
        }
        catch (e) {
            console.log(e)
        }
        this.isAppLoading = false;
        console.log('No loading anymore')
    }

}

const auth = new Auth();
export default auth;