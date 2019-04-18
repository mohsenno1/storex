import React, { Component } from "react";
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import SideBar from "./SideBar";
import ShopPage from "./ShopPage";
import MyHeader from "../../components/MyHeader";
import CategoryPage from "./CategoryPage";
import ProductPage from "./ProductPage";
import BagPage from "./BagPage";
import CheckoutPage from "./CheckoutPage";
import StoresPage from "../other/StoresPage";
import InspirationPage from "../other/InspirationPage";
import MorePage from "../other/MorePage";
import CustomBottomTabBar from "../../components/CustomBottomTabBar";

const hideTabBarIn = ['ProductPage', 'AddressPage', 'PaymentPage', 'ReviewPage']

const shopNav = createStackNavigator(
  {
    ShopPage,
    CategoryPage,
    ProductPage
  },
  {
    initialRouteName: "ShopPage",
    defaultNavigationOptions: ({ navigation }) => ({
      header: props => (
        <MyHeader
          {...props}
          menuPress={() => {
            navigation.toggleDrawer();
          }}
        />
      )
    })
  }
);

const bagNav = createStackNavigator(
  {
    CheckoutPage: {
      screen: CheckoutPage,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    BagPage
  },
  {
    initialRouteName: "BagPage",
    defaultNavigationOptions: ({ navigation, screenProps }) => ({
      header: props => (
        <MyHeader
          {...props}
          menuPress={() => {
            navigation.toggleDrawer();
          }}
        />
      )
    }),
    navigationOptions: {}
  }
);

getActiveRoute = (route) => {
  if(!route.routes)
    return route;
  return getActiveRoute(route.routes[route.index])
}

const tabNav = createBottomTabNavigator(
  {
    shopNav,
    InspirationPage,
    bagNav,
    StoresPage,
    MorePage
  },
  {
    initialRouteName: "shopNav",
    defaultNavigationOptions: ({ navigation }) => {
      return {
        tabBarComponent: ({ navigation }) => {
          const { index, routes } = navigation.state;
          const activeRoute = getActiveRoute(routes[index])
          if(hideTabBarIn.indexOf(activeRoute.routeName) > -1)
            return null
          return (
            <CustomBottomTabBar
              list={routes}
              active={index}
              onPress={item => navigation.navigate(item)}
            />
          );
        },
        tabBarVisible: props => {
          const { index, routes } = navigation.state;
          const routeName = routes[index].routeName;
          console.log(routeName);
          if (routeName === "AddressPage") return false;
          return true;
        }
      };
    }
  }
);

const drawerNav = createDrawerNavigator(
  {
    Shop: { screen: tabNav }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);

const AppContainer = createAppContainer(drawerNav);

export default class Shop extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return <AppContainer />;
  }
}
