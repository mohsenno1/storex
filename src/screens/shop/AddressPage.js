import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomTabBar from "../../components/CustomTabBar";
import { observable } from "mobx";
import { observer, inject } from "mobx-react";
import { Button, Input, registerCustomIconType } from "react-native-elements";
import { gstyles, colors } from "../../shared/Constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

@inject('api', 'auth')
@observer
export default class AddressPage extends Component {
  @observable isLoading = false;
  @observable name;
  @observable surname;
  @observable address1;
  @observable address2;
  @observable city;
  @observable region;
  @observable zipCode;
  @observable country;
  @observable fullName;
  @observable nameErrorMessage;
  @observable surnameErrorMessage;
  @observable address1ErrorMessage;
  @observable address2ErrorMessage;
  @observable cityErrorMessage;
  @observable regionErrorMessage;
  @observable zipCodeErrorMessage;
  @observable countryErrorMessage;

  componentWillMount() {
    const c = this.props.auth.customer
    const n = c.name.split(' ')
    this.name = n[0]
    this.surname =  n.length > 1? n[1]: ''
    this.address1 = c.address_1
    this.address2 = c.address_2
    this.city = c.city
    this.region = c.region
    this.zipCode = c.postal_code
    this.country = c.country
  }

  async saveAndContinue() {
    let isValid = this.validateName();
    isValid &= this.validate();
    if (!isValid) return;

    try {
      this.isLoading = true;
      await this.props.api.updateCustomer({
        name: this.fullName
      });
      await this.props.api.updateCustomerAddress({
        address_1: this.address1,
        address_2: this.address2,
        city: this.city,
        region: this.region,
        postal_code: this.zipCode,
        country: this.country,
        shipping_region_id: 2
      });
      this.props.navigation.navigate("PaymentPage");
    } catch {
    } finally {
      this.isLoading = false;
    }
  }

  validate() {
    let isValid = true;
    if (!this.address1 || this.address1.length < 1) {
      isValid = false;
      this.address1ErrorMessage = "Is Required";
    }
    if (!this.city || this.city.length < 1) {
      isValid = false;
      this.cityErrorMessage = "Is Required";
    }
    if (!this.region || this.region.length < 1) {
      isValid = false;
      this.regionErrorMessage = "Is Required";
    }
    if (!this.zipCode || this.zipCode.length < 1) {
      isValid = false;
      this.zipCodeErrorMessage = "Is Required";
    }
    if (!this.country || this.country.length < 1) {
      isValid = false;
      this.countryErrorMessage = "Is Required";
    }

    return isValid;
  }

  validateName() {
    let res =
      (this.name && this.name.length) || (this.surname && this.surname.length);
    if (res) {
      this.nameErrorMessage = "";
      this.surnameErrorMessage = "";
    } else {
      this.nameErrorMessage = "Is Required";
      this.surnameErrorMessage = "Is Required";
    }
    let nameArr = [this.name, this.surname];
    this.fullName = nameArr.join(" ");
    return res ? true : false;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          style={{ flexGrow: 1, paddingTop: 5, paddingHorizontal: 10 }}
        >
          <View style={gstyles.row}>
            <View style={{ flex: 1 }}>
              <Input
                inputContainerStyle={gstyles.textInput}
                containerStyle={gstyles.textInputContainer}
                inputStyle={gstyles.inputStyle}
                label="First Name"
                errorStyle={styles.errorStyle}
                errorMessage={this.nameErrorMessage}
                onChangeText={val => (this.name = val)}
                value={this.name}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Input
                inputContainerStyle={gstyles.textInput}
                containerStyle={gstyles.textInputContainer}
                inputStyle={gstyles.inputStyle}
                label="Last Name"
                errorStyle={styles.errorStyle}
                errorMessage={this.surnameErrorMessage}
                onChangeText={val => (this.surname = val)}
                value={this.surname}
              />
            </View>
          </View>
          <Input
            inputContainerStyle={gstyles.textInput}
            containerStyle={gstyles.textInputContainer}
            inputStyle={gstyles.inputStyle}
            label="Address Line 1"
            errorStyle={styles.errorStyle}
            errorMessage={this.address1ErrorMessage}
            onChangeText={val => (this.address1 = val)}
            value={this.address1}
          />
          <Input
            inputContainerStyle={gstyles.textInput}
            containerStyle={gstyles.textInputContainer}
            inputStyle={gstyles.inputStyle}
            label="Address Line 2"
            errorStyle={styles.errorStyle}
            errorMessage={this.address2ErrorMessage}
            onChangeText={val => (this.address2 = val)}
            value={this.address2}
          />
          <View style={gstyles.row}>
            <View style={{ flex: 1 }}>
              <Input
                inputContainerStyle={gstyles.textInput}
                containerStyle={gstyles.textInputContainer}
                inputStyle={gstyles.inputStyle}
                label="City"
                errorStyle={styles.errorStyle}
                errorMessage={this.cityErrorMessage}
                onChangeText={val => (this.city = val)}
                value={this.city}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Input
                inputContainerStyle={gstyles.textInput}
                containerStyle={gstyles.textInputContainer}
                inputStyle={gstyles.inputStyle}
                label="State"
                errorStyle={styles.errorStyle}
                errorMessage={this.regionErrorMessage}
                onChangeText={val => (this.region = val)}
                value={this.region}
              />
            </View>
          </View>
          <View style={gstyles.row}>
            <View style={{ flex: 1 }}>
              <Input
                inputContainerStyle={gstyles.textInput}
                containerStyle={gstyles.textInputContainer}
                inputStyle={gstyles.inputStyle}
                label="Zip Code"
                errorStyle={styles.errorStyle}
                errorMessage={this.zipCodeErrorMessage}
                onChangeText={val => (this.zipCode = val)}
                value={this.zipCode}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Input
                inputContainerStyle={gstyles.textInput}
                containerStyle={gstyles.textInputContainer}
                inputStyle={gstyles.inputStyle}
                label="Country"
                errorStyle={styles.errorStyle}
                errorMessage={this.countryErrorMessage}
                onChangeText={val => (this.country = val)}
                value={this.country}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View style={{ height: 65, width: "100%" }}>
          <Button
            title="Save And Continue"
            onPress={async () => await this.saveAndContinue()}
            buttonStyle={[
              gstyles.button,
              { height: 60, backgroundColor: colors.gray }
            ]}
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

const styles = StyleSheet.create({});
