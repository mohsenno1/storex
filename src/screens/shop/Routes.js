import React from 'react'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import SideBar from './SideBar';
import ShopPage from './ShopPage';
import MyHeader from '../../components/MyHeader';
import CategoryPage from './CategoryPage';
import ProductPage from './ProductPage';

const ShopNavigator = createStackNavigator(
    {
        ShopPage,
        CategoryPage,
        ProductPage
    },
    {
        initialRouteName: "ShopPage",
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
        Shop: { screen: ShopNavigator },
        SideBar
    },
    {
        contentComponent: props => <SideBar {...props} />,

    });

export default AppNavigator