import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Svg, { G, Path, Polygon } from 'react-native-svg';
import { colors } from '../shared/Constants';

export default class PolygonIcon extends Component {
    render() {
        const { size, color, strokeWidth, stroke } = this.props
        return (
            <View style={this.props.style}>
                <View>
                    <Svg width={size || 142} height={size * 1.05 || 162} viewBox="0 0 153 162">
                        <G>
                        <Polygon stroke={stroke || "none"} strokeWidth={strokeWidth || 1} fill={color || colors.gray} points="81 0 151.148058 40.5 151.148058 121.5 81 162 10.8519423 121.5 10.8519423 40.5" />
                        </G>
                    </Svg>
                </View>
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                    {this.props.children}
                </View>
            </View>
        );
    }
}
