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
  }},
}
);

export default createAppContainer(TabNavigator);

