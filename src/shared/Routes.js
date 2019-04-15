import { createStackNavigator } from 'react-navigation'
import {auth} from './Stores'
import React from 'react'

import WelcomePage from '../screens/landing-signup/WelcomePage'
import SignInPage from '../screens/landing-signup/SignInPage'
import HomePage from "../screens/landing-signup/HomePage";
import SignUpPage from "../screens/landing-signup/SignUpPage";

import Shop from '../screens/shop/Shop'
import { colors } from './Constans';
import MyHeader from '../components/MyHeader';

const AppNavigator = () => createStackNavigator(
  {
    WelcomePage,
    SignInPage,
    HomePage,
    SignUpPage,
    Shop
  },
  {
    initialRouteName: auth.showWelcomPages? "WelcomePage": "Shop",
    defaultNavigationOptions: ({navigation}) => ({
      //header: props => <MyHeader {...props}/>,
      headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
      headerStyle: {
        backgroundColor: '#f2f2f2',
        height: 60
      },
      headerTintColor: '#454545',
      headerTitleStyle: {
        fontWeight: '400',
        fontSize: 16,
        fontFamily: 'Source Sans Pro',
        textTransform: 'uppercase'
      }
    })
  }
);

export default AppNavigator;