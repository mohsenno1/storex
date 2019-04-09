import { createStackNavigator } from 'react-navigation'
import {auth} from './Stores'
import WelcomePage from '../screens/landing-signup/WelcomePage'

const getRouteTitle = (routeName) => {
  if(!routeName || routeName.length == 0)
    return ''
  routeName = routeName.charAt(0).toLowerCase() + routeName.slice(1) + 'Title'
  let res = auth.myStrings[routeName]
  if(res)
    return res
  return 'No Name'
}

const AppNavigator = createStackNavigator(
  {
    WelcomePage
  },
  {
    initialRouteName: auth.showWelcomPages? "WelcomePage": "Home",
    defaultNavigationOptions: ({navigation}) => ({
      //title: getRouteTitle(navigation.state.routeName),
      headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
      headerStyle: {
        backgroundColor: 'black',
        height: 60
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '400',
        fontSize: 16
      }
    })
  }
);

export default AppNavigator;