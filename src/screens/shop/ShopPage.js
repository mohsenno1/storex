import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { colors, gstyles } from '../../shared/Constans';
import Offer from './../../assets/images/offer.png'
import FullWidthImage from '../../components/FullWidthImage';
import { PanGestureHandler, TouchableHighlight } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import { inject } from 'mobx-react';

@inject('api')
export default class ShopPage extends Component {
  componentDidMount() {
    this.props.api.initShoppingCart()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>

        <View style={styles.alertContainer}>
          <TouchableOpacity style={{ flexDirection: 'row' }}
            onPress={() => this.props.navigation.navigate('CategoryPage', { category: 'wintersale' })}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
              <Text style={[gstyles.upperText, { color: colors.yellow }]}>Last Chance!</Text>
              <Text style={[gstyles.textStyle, { color: 'white' }]}> Holiday Shopping Ends Soon. </Text>
              <Text style={[gstyles.linkStyle]}> Shop Now</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.menShoping}>
          <TouchableOpacity style={{ flexDirection: 'row' }}
            onPress={() => this.props.navigation.navigate('CategoryPage', { category: 'men' })}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
              <Text style={[gstyles.upperText, { color: 'white', fontSize: 45 }]}>Men</Text>
              <Text style={[gstyles.upperText, { color: 'white', fontSize: 20 }]}>Outwear</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.womenShoping}>
          <TouchableOpacity style={{ flexDirection: 'row' }}
            onPress={() => this.props.navigation.navigate('CategoryPage', { category: 'women' })}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
              <Text style={[gstyles.upperText, { color: 'white', fontSize: 45 }]}>Women</Text>
              <Text style={[gstyles.upperText, { color: 'white', fontSize: 20 }]}>Outwear</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('CategoryPage', { category: 'wintersale' })}>
          <FullWidthImage source={Offer} />
        </TouchableOpacity>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  alertContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray,
    flexDirection: 'row',
  },
  menShoping: {
    backgroundColor: colors.menColor,
    flex: 2,
  },
  womenShoping: {
    backgroundColor: colors.womenColor,
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  offer: {

  }
})
