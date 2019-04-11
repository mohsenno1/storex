import React, { Component } from 'react';
import { View } from 'react-native';
import Diamond from './Diamond'
import { colors, gstyles } from './../shared/Constans';

export default class FancyLine extends Component {
    render() {
        return (
            <View style={{ position: 'absolute', top: 0, width: '100%', alignItems: 'center', height: 2, backgroundColor: 'rgba(0,0,0,0.1)' }}>
                <View style={{marginTop: -7.5}}><Diamond size={16} color={colors.yellow} /></View>
            </View>
        );
    }
}
