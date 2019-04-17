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
                    <Svg width={size || 142} height={size * 1.14 || 162} viewBox="0 0 142 162">
                        <G stroke={stroke || "none"} strokeWidth={strokeWidth || 1} fill="none" fillRule="evenodd">
                            <G transform="translate(-164.000000, -817.000000)">
                                <G transform="translate(29.000000, 681.000000)">
                                    <G transform="translate(125.000000, 136.000000)">
                                        <Polygon fill={color || colors.gray} points="81 0 151.148058 40.5 151.148058 121.5 81 162 10.8519423 121.5 10.8519423 40.5" />
                                    </G>
                                </G>
                            </G>
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
