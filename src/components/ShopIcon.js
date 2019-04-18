import React, { Component } from "react";
import { View, Text } from "react-native";
import Svg, { G, Path, Polygon } from "react-native-svg";
import { colors } from "../shared/Constants";

export default class ShopIcon extends Component {
  render() {
    const { size, color } = this.props;
    return (
      <Svg
        width={size || 48}
        height={size * (55 / 48) || 55}
        viewBox="0 0 147.98 170.88"
      >
        <G>
          <Polygon
            fill="none"
            stroke={color || "white"}
            strokeWidth="12.51"
            points="73.99,7.22 141.72,46.34 141.72,124.54 73.99,163.65 6.26,124.54 6.26,46.34 "
          />
          <Polygon
            fill={color || "white"}
            points="73.99,44.05 109.83,64.74 109.83,106.14 73.99,126.83 38.14,106.14 38.14,64.74 "
          />
        </G>
      </Svg>
    );
  }
}
