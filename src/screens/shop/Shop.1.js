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

const ShopPageNavigator = createStackNavigator(
  {
    ShopPage,
    CategoryPage,
    ProductPage
  },
  {
    initialRouteName: "ShopPage",
    defaultNavigationOptions: ({ navigation }) => ({
      header: null
    })
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    ShopPageNavigator,
    InspirationPage,
    BagPage,
    StoresPage,
    MorePage
  },
  {
    initialRouteName: "ShopPageNavigator",
    defaultNavigationOptions: ({ navigation }) => {
      return {
        tabBarComponent: ({ navigation }) => {
          const { index, routes } = navigation.state;
          return (
            <CustomBottomTabBar
              list={routes}
              active={index}
              onPress={item => navigation.navigate(item)}
            />
          );
        }
      };
    }
  }
);

const ShopNavigator = createStackNavigator(
  {
    TabNavigator,
    CheckoutPage
  },
  {
    initialRouteName: "TabNavigator",
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
    navigationOptions: {
      header: null
    }
  }
);
const AppNavigator = createDrawerNavigator(
  {
    Shop: { screen: ShopNavigator }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class Shop extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return <AppContainer />;
  }
}
