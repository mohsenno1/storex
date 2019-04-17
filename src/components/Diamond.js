import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Svg, { G, Path, Polygon } from 'react-native-svg';
import { colors } from '../shared/Constants';

export default class Diamond extends Component {
    render() {
        const {size, color} = this.props
        return (
            <Svg width={size || 64} height={size || 64} viewBox="0 0 64 64">
                <G>
                    <Polygon fill={color || colors.gray} points="32 0 0 32 32 64 64 32" />
                </G>
            </Svg>
        );
    }
}
