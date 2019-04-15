import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Svg, { G, Path, Polygon } from 'react-native-svg';
import { colors } from '../shared/Constans';

export default class ShopIcon extends Component {
    render() {
        const { size, color } = this.props
        return (
            <Svg width={size || 48} height={size * (55 / 48) || 55} viewBox="0 0 58.51 66.97">
                <G>
                    <Path fill={color || 'none'} stroke="white"  strokeWidth={size / 10} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="2.61313" d="M29.25 1.9l27.36 15.8 0 31.59 -27.36 15.8 -27.36 -15.8 0 -31.59 27.36 -15.8zm0 14.87l14.48 8.36 0 16.72 -14.48 8.36 -14.48 -8.36 0 -16.72 14.48 -8.36z" />
                </G>
            </Svg>
        );
    }
}
