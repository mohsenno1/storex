import React from 'react'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import SideBar from './SideBar';
import ShopPage from './ShopPage';
import MyHeader from '../../components/MyHeader';
import CategoryPage from './CategoryPage';
import ProductPage from './ProductPage';
import BagPage from './BagPage';
import CheckoutPage from './CheckoutPage';

const ShopNavigator = createStackNavigator(
    {
        ShopPage,
        CategoryPage,
        ProductPage,
        BagPage,
        CheckoutPage,
    },
    {
        initialRouteName: "BagPage",
        defaultNavigationOptions: ({ navigation, screenProps }) => ({
            header: props => <MyHeader {...props}
                menuPress={() => {
                    navigation.toggleDrawer()
                }} />,
        })
    }
);
const AppNavigator = createDrawerNavigator(
    {
        Shop: { screen: ShopNavigator }
    },
    {
        contentComponent: props => <SideBar {...props} />,
    });

export default AppNavigator