import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { gstyles, colors } from '../../shared/Constants';
import FancyLine from '../../components/FancyLine';
import { Input, Button } from 'react-native-elements'
import MyDateTimePicker from '../../components/MyDateTimePicker';
import { inject, observer } from 'mobx-react';
import { observable, reaction } from 'mobx';
import MySwitchSelector from '../../components/MySwitchSelector';
import Switch from 'react-native-switch-pro'

@inject('auth')
@observer
export default class SignUpPage extends Component {
    static navigationOptions = {
        title: 'Sign Up',
    };

    constructor(props) {
        super(props);
        reaction(() => this.email,
            () => this.validateEmail()
        )
        reaction(() => [this.password, this.confirmPassword],
            () => {
                this.validatePassword()
                this.validateConfirmPassword()
            }
        )

        reaction(() => [this.name, this.surname],
            () => {
                this.validateName()
            }
        )
    }

    fullname = ''
    @observable errorMessage = null
    @observable name = ''
    @observable surname = ''
    @observable email = ''
    @observable password = ''
    @observable confirmPassword = ''
    @observable nameErrorMessage = ''
    @observable surnameErrorMessage = ''
    @observable emailErrorMessage = ''
    @observable passwordErrorMessage = ''
    @observable isLoading = false
    @observable isAccepted = false

    handleSignup = async () => {
        if (this.isLoading)
            return
        let isValid = this.validateEmail()
        isValid &= this.validatePassword()
        isValid &= this.validateConfirmPassword()
        isValid &= this.validateName()
        if (!this.confirmPassword) {
            this.confirmPasswordErrorMessage = 'Passwords are not matched'
            this.forceUpdate()
            isValid = false;
        }

        if (!isValid)
            return

        this.isLoading = true;
        let error = await this.props.auth.signUp({
            name: this.fullname,
            email: this.email,
            password: this.password
        })
        this.errorMessage = error
        this.isLoading = false
        if (error)
            this.errorMessage = error
    }

    validateEmail() {
        let email = this.email
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let res = re.test(email);
        if (res)
            this.emailErrorMessage = ''
        else
            this.emailErrorMessage = 'Enter a valid email address'
        return res
    }

    validateName() {
        let res = (this.name && this.name.length) || (this.surname && this.surname.length)
        if (res) {
            this.nameErrorMessage = '';
            this.surnameErrorMessage = '';
        }
        else {
            this.nameErrorMessage = 'Required';
            this.surnameErrorMessage = 'Required';
        }
        let nameArr = [this.name, this.surname];
        this.fullname = nameArr.join(' ')
        return res
    }

    validatePassword() {
        let pass = this.password;
        let res = (pass && pass.length >= 8)
        if (res)
            this.passwordErrorMessage = ''
        else
            this.passwordErrorMessage = 'Password length must be equal or greater than 8 characters'
        return res
    }

    validateConfirmPassword() {
        let cpass = this.confirmPassword;
        let pass = this.password;
        let res = (!cpass || pass === cpass)
        if (res)
            this.confirmPasswordErrorMessage = ''
        else
            this.confirmPasswordErrorMessage = 'Passwords are not matched'
        return res
    }

    render() {
        return (
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1, }}>
                    <View style={{ flex: 1, padding: 10, paddingBottom: 25, justifyContent: 'space-between' }}>
                        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            {this.errorMessage &&
                                <Text style={{ color: 'red', textAlign: "center", paddingBottom: 15 }}>
                                    {this.errorMessage}
                                </Text>}
                        </View>
                        <View style={gstyles.row}>
                            <View style={{ flex: 1 }}><Input inputContainerStyle={gstyles.textInput}
                                containerStyle={gstyles.textInputContainer}
                                inputStyle={gstyles.inputStyle}
                                label='First Name'
                                errorStyle={styles.errorStyle}
                                errorMessage={this.nameErrorMessage}
                                onChangeText={val => this.name = val}
                                value={this.name}
                            /></View>
                            <View style={{ flex: 1 }}><Input inputContainerStyle={gstyles.textInput}
                                containerStyle={gstyles.textInputContainer}
                                inputStyle={gstyles.inputStyle}
                                label='Last Name'
                                errorStyle={styles.errorStyle}
                                errorMessage={this.surnameErrorMessage}
                                onChangeText={val => this.surname = val}
                                value={this.surname}
                            /></View>
                        </View>
                        <Input inputContainerStyle={gstyles.textInput}
                            containerStyle={gstyles.textInputContainer}
                            inputStyle={gstyles.inputStyle}
                            label='Email'
                            errorStyle={styles.errorStyle}
                            errorMessage={this.emailErrorMessage}
                            onChangeText={val => this.email = val}
                            value={this.email}
                        />
                        <Input inputContainerStyle={gstyles.textInput}
                            containerStyle={gstyles.textInputContainer}
                            inputStyle={gstyles.inputStyle}
                            secureTextEntry={true}
                            label='Password'
                            errorStyle={styles.errorStyle}
                            errorMessage={this.passwordErrorMessage}
                            onChangeText={val => this.password = val}
                            value={this.password}
                        />
                        <Input inputContainerStyle={gstyles.textInput}
                            containerStyle={[gstyles.inputStyle]}
                            inputStyle={gstyles.inputStyle}
                            secureTextEntry={true}
                            label='Retype Password'
                            errorStyle={styles.errorStyle}
                            errorMessage={this.confirmPasswordErrorMessage}
                            onChangeText={val => this.confirmPassword = val}
                            value={this.confirmPassword}
                        />
                        <MyDateTimePicker />
                        {/* <MySwitchSelector /> */}
                        <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={[gstyles.upperText, { color: colors.lightText }]}>I agree the terms of use</Text>
                                </View>
                                <View>
                                    <Switch width={55} height={28}
                                        circleColorActive={colors.yellow}
                                        circleColorInactive={colors.darkText}
                                        circleStyle={{ height: 20, width: 20, margin: 5, }}
                                        backgroundActive="#EBEBEB"
                                        backgroundInactive="#EBEBEB"
                                        onSyncPress={value => { this.isAccepted = value }} />
                                </View>
                            </View>

                        </View>
                        <Button title="Sign Up"
                            onPress={this.handleSignup}
                            buttonStyle={[gstyles.button, { height: 60 }]}
                            titleStyle={gstyles.buttonTitle}
                            containerStyle={gstyles.buttonContainer}
                            disabled={!this.isAccepted}
                            loading={this.isLoading} />
                    </View>
                    <View style={{ height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.lightGray }}>
                        <FancyLine />
                        <Text style={{ color: colors.darkText }}>Already a memeber? <Text style={gstyles.linkStyle}
                            onPress={() => this.props.navigation.navigate('SignInPage')}> Sign In</Text></Text>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',

    }
})
