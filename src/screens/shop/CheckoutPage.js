import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomTabBar from '../../components/CustomTabBar';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Button, Input } from 'react-native-elements';
import { gstyles, colors } from '../../shared/Constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import AddressPage from './AddressPage'
import PaymentPage from './PaymentPage'
import ReviewPage from './ReviewPage'

// @inject()
// @observer
// export default class CheckoutPage extends Component {
//   constructor(props) {
//     super(props);
//   }

//   @observable activePage = 'Address'
//   render() {
//     return (
//       <View style={{ flex: 1 }}>
//         <CustomTabBar active={this.activePage} onPress={item => this.activePage = item} />
//         <AddressPage />
//       </View>
//     );
//   }
// }

const TabNavigator = createMaterialTopTabNavigator({
  AddressPage,
  PaymentPage,
  ReviewPage,
},
{
  defaultNavigationOptions: ({ navigation }) => {
    return {
      tabBarComponent: ({navigation}) => {
        const { index, routes } = navigation.state;
        return <CustomTabBar list={routes} active={index} onPress={item => navigation.navigate(item)} />
      },
  }}
}
);

export default createAppContainer(TabNavigator);

