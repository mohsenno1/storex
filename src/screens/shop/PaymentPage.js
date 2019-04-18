import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomTabBar from "../../components/CustomTabBar";
import { observable } from "mobx";
import { observer, inject } from "mobx-react";
import { Button, Input } from "react-native-elements";
import { gstyles, colors } from "../../shared/Constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FAIcon from "react-native-vector-icons/FontAwesome";
import PayPal from "./../../assets/images/paypal.svg";
import VisaMaster from "./../../assets/images/visa_mastercard.svg";
import TextInputMask from "react-native-text-input-mask";

@inject("auth", "api")
@observer
export default class PaymentPage extends Component {
  @observable cardNo = "";
  @observable expiry = "";
  @observable cvc = "";

  validate() {
    if (!this.cardNo || this.cardNo.length < 16) {
      alert("'Card No' Is Required");
      return false;
    }
    if (!this.expiry || this.expiry.length < 4) {
      alert("'Expiry' Is Required");
      return false;
    }
    if (!this.cvc || this.expiry.cvc < 3) {
      alert("'CVC' Is Required");
      return false;
    }
    return true;
  }

  async payNow() {
    if (this.validate()) {
      try {
        await this.props.api.payNow({
          cardNo: this.cardNo,
          expiry: this.expiry,
          cvc: this.cvc
        });
        this.props.navigation.navigate("ReviewPage");
      } catch (e) {
        alert(e);
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <KeyboardAwareScrollView
            style={{
              flexGrow: 1,
              flex: 1,
              paddingTop: 5,
              paddingHorizontal: 10
            }}
          >
            <View style={{ height: 80, flexDirection: "row" }}>
              <View style={styles.paymentButtons}>
                <PayPal width={120} />
              </View>
              <View style={styles.paymentButtons}>
                <VisaMaster width={120} />
              </View>
            </View>
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
              <Text
                style={{
                  ...gstyles.upperText,
                  fontSize: 18,
                  color: colors.gray
                }}
              >
                Credit Details
              </Text>
              <Text
                style={{
                  color: colors.lightText,
                  fontSize: 16,
                  lineHeight: 23
                }}
              >
                Enter your debit or credit card details:
              </Text>
            </View>
            <View style={{ padding: 10 }}>
              <View style={{ ...styles.tableRow }}>
                <View style={{ ...styles.tableLabel }}>
                  <Text style={{ ...styles.tableLabelText }}>Card No:</Text>
                </View>
                <TextInputMask
                  onChangeText={(formatted, extracted) => {
                    this.cardNo = extracted;
                  }}
                  mask={"[0000] [0000] [0000] [0000]"}
                  keyboardType="number-pad"
                  placeholder="1234 1234 1234 1234"
                  value={this.cardNo}
                />
              </View>
              <View style={{ ...styles.tableRow }}>
                <View style={{ ...styles.tableLabel }}>
                  <Text style={{ ...styles.tableLabelText }}>Expiry:</Text>
                </View>
                <TextInputMask
                  onChangeText={(formatted, extracted) => {
                    this.expiry = extracted;
                  }}
                  mask={"[00]/[00]"}
                  placeholder="YY/MM"
                  keyboardType="number-pad"
                  value={this.expiry}
                />
              </View>
              <View style={{ ...styles.tableRow }}>
                <View style={{ ...styles.tableLabel }}>
                  <Text style={{ ...styles.tableLabelText }}>CVC:</Text>
                </View>
                <TextInputMask
                  onChangeText={(formatted, extracted) => {
                    this.cvc = extracted;
                  }}
                  mask={"[000]"}
                  placeholder="000"
                  keyboardType="number-pad"
                  value={this.cvc}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
        <View style={styles.shipTo}>
          <Text
            style={{
              ...gstyles.upperText,
              fontWeight: "bold",
              fontSize: 16,
              color: colors.darkText
            }}
          >
            Ship To
          </Text>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{ color: colors.gray, fontSize: 15, lineHeight: 20 }}
              >
                {this.props.auth.customerAddress}
              </Text>
            </View>
            <View style={styles.buttonBar}>
              <FAIcon name="edit" size={25} color={colors.lightText} />
            </View>
          </View>
        </View>
        <View style={{ height: 65, width: "100%" }}>
          <Button
            title="Pay Now"
            onPress={() => this.payNow()}
            buttonStyle={[gstyles.button, { height: 60, borderRadius: 0 }]}
            titleStyle={{
              ...gstyles.upperText,
              color: "white",
              fontWeight: "bold"
            }}
            containerStyle={{ width: "100%" }}
            loading={this.isLoading}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  shipTo: {
    height: 80,
    padding: 10,
    width: "100%",
    backgroundColor: colors.lightGray,
    borderTopColor: colors.black10,
    borderTopWidth: 1
  },
  buttonBar: {
    width: 50,
    ...gstyles.center
  },
  paymentButtons: {
    flex: 1,
    margin: 10,
    marginTop: 15,
    borderColor: colors.black20,
    borderWidth: 1,
    borderRadius: 5,
    ...gstyles.center
  },
  tableRow: {
    height: 55,
    width: "100%",
    flexDirection: "row",
    borderColor: colors.black10,
    borderWidth: 1
  },
  tableLabel: {
    justifyContent: "center",
    paddingLeft: 10,
    backgroundColor: colors.lightGray,
    width: 120
  },
  tableLabelText: {
    ...gstyles.textStyle,
    fontWeight: "300"
  }
});
