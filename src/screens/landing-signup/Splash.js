
import React, { Component } from 'react'
import { View, Text, StyleSheet, Image} from 'react-native'

export default class Splash extends Component {
    render() {
        return <View style={styles.splash}>
            <Image style={{width: 236, resizeMode: 'contain'}} source={require('./../../assets/images/logo.png')} />
        </View>
    }
}

const styles = StyleSheet.create({
    splash: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    }
  });