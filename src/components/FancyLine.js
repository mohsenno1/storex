import React, { Component } from 'react';
import { View } from 'react-native';
import Diamond from './Diamond'
import { colors, gstyles } from './../shared/Constans';

export default class FancyLine extends Component {
    render() {
        const { size, backgroundColor, color } = this.props
        return (
            <View style={{ position: 'absolute', top: 0, width: '100%', alignItems: 'center', height: 2, backgroundColor: backgroundColor || 'rgba(0,0,0,0.1)' }}>
                <View style={{ marginTop: ((-size / 2) + 1) || -7.5 }}><Diamond size={size || 16} color={color || colors.yellow} /></View>
            </View>
        );
    }
}
