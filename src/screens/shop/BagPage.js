import React, { Component, PureComponent } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { inject, observer } from "mobx-react";
import { colors, gstyles } from "../../shared/Constants";
import BagIcon from "./../../components/BagIcon";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { FlatList } from "react-native-gesture-handler";
import { Button } from "react-native-elements";

@inject("api")
@observer
export default class BagPage extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await this.props.api.initShoppingCart();
  }

  render() {
    const { cartItems, total, subtotal, shipping } = this.props.api;
    const isEmpty = cartItems.length < 1;
    return (
      <View style={{ flex: 1, ...gstyles.center }}>
        {isEmpty ? (
          <View style={styles.emptyContainer}>
            <BagIcon size={33} stroke={colors.lightText} />
            <Text
              style={{
                ...gstyles.textStyle,
                color: colors.lightText,
                paddingVertical: 12,
                fontSize: 16
              }}
            >
              You have no itam in your shopping bag
            </Text>
          </View>
        ) : (
          <View style={{ width: "100%", height: "100%" }}>
            <View style={styles.topBar}>
              <View style={{ flex: 1, ...gstyles.center, padding: 5 }}>
                <Text style={{ ...gstyles.textStyle }}>
                  You have{" "}
                  <Text style={{ color: colors.yellow, fontWeight: "bold" }}>
                    {cartItems.length} items
                  </Text>{" "}
                  in your bag
                </Text>
              </View>
              <View style={{ flex: 1, padding: 10 }}>
                <Button
                  title="Checkout"
                  onPress={() => this.props.navigation.navigate("AddressPage")}
                  buttonStyle={[gstyles.button, { height: 43 }]}
                  titleStyle={{
                    ...gstyles.upperText,
                    color: "white",
                    fontWeight: "bold"
                  }}
                  containerStyle={gstyles.buttonContainer}
                  loading={this.isLoading}
                />
              </View>
            </View>
            <FlatList
              style={styles.flatList}
              data={cartItems}
              renderItem={({ item }) => <CartItem item={item} />}
              keyExtractor={(item, index) => item.item_id.toString()}
            />
            <View
              style={[
                styles.bottomBars,
                { height: 70, paddingVertical: 6, paddingHorizontal: 15 }
              ]}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.bottomBarText}>Subtotal</Text>
                <Text style={styles.bottomBarText}>Shiping</Text>
              </View>
              <View style={{ width: 100, alignItems: "flex-end" }}>
                <Text style={styles.bottomBarText}>${subtotal}</Text>
                <Text style={styles.bottomBarText}>${shipping}</Text>
              </View>
            </View>
            <View style={[styles.bottomBars, { height: 100, padding: 15 }]}>
              <View style={{ flex: 1 }}>
                <Text style={{ ...gstyles.textStyle, fontSize: 23 }}>
                  Total
                </Text>
              </View>
              <View style={{ width: 100, alignItems: "flex-end" }}>
                <Text style={{ ...gstyles.textStyle, fontSize: 23 }}>
                  ${total}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

class CartItem extends PureComponent {
  render() {
    const { item } = this.props;
    const discounted = item.discounted_price > 0;
    return (
      <TouchableOpacity style={styles.item} onPress={this.props.onPress}>
        <View
          style={{
            width: 80,
            height: "100%",
            backgroundColor: colors.lightGray
          }}
        />
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flexDirection: "column", flex: 1, padding: 10 }}>
            <Text style={{ ...gstyles.upperText, fontSize: 16 }}>
              {item.name}
            </Text>
            <View style={{ marginVertical: 10, flexDirection: "row" }}>
              <Text style={styles.discountedPrice}>
                ${item.price} x {item.quantity}:{" "}
              </Text>
              <Text style={styles.price}>${item.subtotal}</Text>
            </View>
          </View>
          <View style={styles.buttonBar}>
            <FAIcon name="edit" size={25} color={colors.lightText} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    height: 80,
    width: "100%",
    borderBottomColor: colors.black20,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonBar: {
    width: 60,
    ...gstyles.center
  },
  topBar: {
    height: 70,
    width: "100%",
    flexDirection: "row",
    borderBottomColor: colors.black30,
    borderBottomWidth: 1
  },
  bottomBarText: {
    ...gstyles.textStyle,
    fontSize: 15,
    color: colors.lightText,
    paddingVertical: 3
  },
  bottomBars: {
    width: "100%",
    flexDirection: "row",
    borderTopColor: colors.black30,
    borderTopWidth: 1,
    backgroundColor: colors.lightGray
  },
  price: {
    ...gstyles.upperText,
    fontSize: 15,
    fontWeight: "bold",
    color: colors.darkText
  },
  discountedPrice: {
    ...gstyles.upperText,
    fontSize: 13,
    //fontWeight: 'bold',
    color: colors.lightText
  },
  emptyContainer: {
    height: 160,
    width: "90%",
    ...gstyles.center,
    borderWidth: 1,
    borderColor: colors.black40,
    borderRadius: 10,
    backgroundColor: colors.lightGray,
    padding: 10
  },
  flatList: {
    flex: 1
  }
});
