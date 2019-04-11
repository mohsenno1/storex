import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { gstyles, colors } from '../../shared/Constans';
import FancyLine from '../../components/FancyLine';

export default class SignUpPage extends Component {
    static navigationOptions = {
        title: 'Sign Up',
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{flex: 1}}>
                        <View style={gstyles.row}>
                            <Text>sddsd </Text>
                            <Text> dsd sd</Text>
                        </View>
                    </View>
                    <View style={{height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.lightGray}}>
                        <FancyLine/>
                        <Text>Already a memeber? <Text style={gstyles.linkStyle}
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
