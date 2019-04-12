import { createStackNavigator } from 'react-navigation'
import {auth} from './Stores'
import WelcomePage from '../screens/landing-signup/WelcomePage'
import SignInPage from '../screens/landing-signup/SignInPage'
import HomePage from "../screens/landing-signup/HomePage";
import SignUpPage from "../screens/landing-signup/SignUpPage";

import ShopPage from '../screens/shop/ShopPage'
import { colors } from './Constans';

const AppNavigator = () => createStackNavigator(
  {
    WelcomePage,
    SignInPage,
    HomePage,
    SignUpPage,
    ShopPage
  },
  {
    initialRouteName: auth.showWelcomPages? "WelcomePage": "HomePage",
    defaultNavigationOptions: ({navigation}) => ({
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