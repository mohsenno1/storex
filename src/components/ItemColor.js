import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Svg, { G, Polygon, } from 'react-native-svg';


export default class ItemColor extends Component {
    render() {
        const { size, active, color, strokeWidth } = this.props;
        return <Svg width={size || 64} height={size * 1.156 || 74} viewBox="0 0 64 74">
            <G stroke="none" strokeWidth={"1"} fill="none" fill-rule="evenodd">
                <G transform="translate(-32.000000, -811.000000)">
                    <G transform="translate(29.000000, 749.000000)">
                        <G transform="translate(0.000000, 64.000000)">
                            <Polygon fill={active ? '#F3B453' : null} stroke={active ? '#F3B453' : "#CCCCCC"} strokeWidth={strokeWidth || 2} points="35 0 65.3108891 17.5 65.3108891 52.5 35 70 4.68911087 52.5 4.68911087 17.5" />
                            <Polygon fill={color} points="35.5 18 50.6554446 26.75 50.6554446 44.25 35.5 53 20.3445554 44.25 20.3445554 26.75" />
                        </G>
                    </G>
                </G>
            </G>
        </Svg>
    }
}

