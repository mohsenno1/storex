import React, { Component } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { gstyles, colors } from "../shared/Constants";
import EIcon from "react-native-vector-icons/EvilIcons";
import FIcon from "react-native-vector-icons/Feather";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { observer, inject } from "mobx-react";
import { observable } from "mobx";
import ShopIcon from "./ShopIcon";
import BagIcon from "./BagIcon";
import {Badge} from 'react-native-elements'

const titles = ["Shop", "Inspiration", "Bag", "Stores", "More"];

@inject('api')
@observer
export default class CustomBottomTabBar extends Component {
  componentWillMount() {
    active = this.props.active;
    this.props.list.forEach(element => {
      this.list.push(element);
    });
  }

  @observable list = [];
  @observable active = 0;

  render() {
    const activeIndex = active;
    const { cartItems } = this.props.api
    return (
      <View
        style={{
          width: "100%",
          backgroundColor: colors.lightGray,
          borderTopColor: colors.black10,
          borderTopWidth: 2,
          height: 60,
          flexDirection: "row"
        }}
      >
        {this.list.map((item, index) => {
          const isActive = index == activeIndex;
          const color = isActive ? colors.darkText : colors.lightText;
          return (
            <View key={index} style={{ flex: index == 2 ? 2 : 1 }}>
              <TouchableWithoutFeedback
                style={{ flexDirection: "row" }}
                onPress={() => {
                  if (!isActive) this.props.onPress(item.key);
                }}
              >
                <View
                  style={{
                    flex: 1,
                    ...gstyles.center,
                    height: 60
                  }}
                >
                  {index == 0 && <ShopIcon size={30} color={color} />}
                  {index == 1 && <FIcon name="sun" size={32} color={color} />}
                  {index == 3 && <EIcon name="location" size={43} color={color} />}
                  {index == 4 && <FIcon name="more-horizontal" size={34} color={color} />}
                  {index == 2 && (
                    <View
                      style={{
                        ...gstyles.center,
                        height: 90,
                        width: 90,
                        marginBottom: 45,
                        backgroundColor: isActive
                          ? colors.black30
                          : colors.black20,
                        borderRadius: 45,
                        borderColor: colors.black30,
                        borderWidth: 1
                      }}
                    >
                      <View
                        style={{
                          ...gstyles.center,
                          height: 80,
                          width: 80,
                          backgroundColor: colors.lightGray,
                          borderRadius: 40,
                          borderColor: "rgba(255,255,255,0.2)",
                          borderWidth: 1
                        }}
                      >
                        <View style={{ marginBottom: 10 }}>
                          <BagIcon size={37} stroke={color} />
                          <Badge
                            badgeStyle={{ backgroundColor: colors.yellow }}
                            value={cartItems.length}
                            containerStyle={{
                              position: "absolute",
                              top: 0,
                              right: -6
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  )}
                  {index !== 2 && (
                    <Text
                      style={{
                        ...gstyles.textStyle,
                        fontSize: 11,
                        fontWeight: "bold",
                        marginTop: 0,
                        marginBottom: 3,
                        color: color
                      }}
                    >
                      {titles[index]}
                    </Text>
                  )}
                </View>
              </TouchableWithoutFeedback>
            </View>
          );
        })}
      </View>
    );
  }
}
