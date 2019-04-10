import React, { Component } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { observer, inject } from 'mobx-react';
import { colors, gstyles } from './../../shared/Constans';
import { observable, reaction } from 'mobx';
import EIcon from 'react-native-vector-icons/Entypo'
import FIcon from 'react-native-vector-icons/FontAwesome'
import { ScrollView } from 'react-native-gesture-handler';
import Diamond from '../../components/Diamond';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PolygonIcon from '../../components/PolygonIcon';

@inject()
@observer
export default class SignInPage extends Component {
    static navigationOptions = {
        title: 'Sign In',
    };

    constructor(props) {
        super(props)
        reaction(() => this.email,
            () => this.validateEmail()
        )
        reaction(() => this.password,
            () => this.validatePassword()
        )
    }

    @observable errorMessage = null
    @observable email = ''
    @observable password = ''
    @observable emailErrorMessage = ''
    @observable passwordErrorMessage = ''
    @observable isLoading = false

    handleLogin = async () => {
        if (this.isLoading)
            return
        let isValid = this.validateEmail()
        isValid &= this.validatePassword()
        if (!isValid)
            return

        this.isLoading = true;
        let error = await this.props.auth.signUp({
            signupType: 'signinMail',
            email: this.email,
            password: this.password
        })
        this.isLoading = false
        if (error)
            this.errorMessage = error
    }

    validateEmail() {
        let email = this.email;
        let res = (email && email.length > 0)
        if (res)
            this.emailErrorMessage = ''
        else
            this.emailErrorMessage = 'Email is required'
        return res
    }

    validatePassword() {
        let pass = this.password;
        let res = (pass && pass.length > 0)
        if (res)
            this.passwordErrorMessage = ''
        else
            this.passwordErrorMessage = 'Password is required'
        return res
    }

    render() {
        return <KeyboardAwareScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Input inputContainerStyle={styles.textInput}
                    containerStyle={[styles.textInputContainer]}
                    placeholderTextColor={colors.gray}
                    inputStyle={{ color: colors.gray }}
                    placeholder='Email'
                    leftIcon={<EIcon name="email" size={20} color={colors.gray} />}
                    errorStyle={styles.errorStyle}
                    errorMessage={this.emailErrorMessage}
                    onChangeText={email => this.email = email}
                    value={this.email}
                />
                <Input inputContainerStyle={styles.textInput}
                    containerStyle={[styles.textInputContainer]}
                    placeholderTextColor={colors.gray}
                    inputStyle={{ color: colors.gray }}
                    secureTextEntry={true}
                    placeholder='Password'
                    leftIcon={<FIcon name="user-secret" size={20} color={colors.gray} />}
                    errorStyle={styles.errorStyle}
                    errorMessage={this.passwordErrorMessage}
                    onChangeText={password => this.password = password}
                    value={this.password}
                />

                <Button title="Login"
                    onPress={this.handleLogin}
                    buttonStyle={styles.button}
                    loading={this.isLoading} />
                <Text style={{
                    marginVertical: 15,
                    color: colors.gray
                }}>
                    Forgot Password?
                    </Text>
            </View>
            <View style={[styles.container, { color: colors.lightGray, borderTopWidth: 2, borderTopColor: "rgba(0,0,0,0.1)" }]}>
                <View style={{ position: 'absolute', top: -9, width: '100%', alignItems: 'center', height: 1 }}>
                    <Diamond size={16} color={colors.yellow} />
                </View>
                <View style={{ height: 100, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={[gstyles.upperText, { paddingHorizontal: 30 }]}>OR, Sign In Using Social Networks</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}>
                    <PolygonIcon color={colors.facebook} size={80} style={{paddingHorizontal: 10}}>
                        <FIcon name="facebook" size={25} color="white" color="white" />
                    </PolygonIcon>
                    <PolygonIcon color={colors.twitter} size={80} style={{paddingHorizontal: 10}}>
                        <FIcon name="twitter" size={25} color="white" color="white" />
                    </PolygonIcon>
                </View>
                <View style={{ height: 60, alignItems: 'center', justifyContent: 'center' }}><Text>adbd</Text></View>

            </View>
        </KeyboardAwareScrollView>

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorStyle: {
        color: 'red',
        fontSize: 13
    },
    textInputContainer: {
        marginBottom: 5,
        width: 350
    },
    button: {
        backgroundColor: colors.yellow,
        width: 150,
        height: 40,
        borderWidth: 0,
        marginTop: 25,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5
    },
    textInput: {
        borderRadius: 15,
        marginTop: 10
    }
})