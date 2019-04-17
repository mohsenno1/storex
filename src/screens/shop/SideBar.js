import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { colors, gstyles } from '../../shared/Constants';
import ShopIcon from '../../components/ShopIcon';
import { Badge } from 'react-native-elements';
import BagIcon from '../../components/BagIcon';
import EIcon from 'react-native-vector-icons/EvilIcons'
import FIcon from 'react-native-vector-icons/Feather'
import FancyLine from '../../components/FancyLine';
import FAIcon from 'react-native-vector-icons/FontAwesome'
import PolygonIcon from '../../components/PolygonIcon';
import { inject } from 'mobx-react';

@inject('api')
class SideBar extends Component {
    navigateToScreen(route) {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
       
        this.props.navigation.dispatch(navigateAction);
    }

    render() {
        const {cartItems} = this.props.api
        return (
            <View style={styles.container}>
                <View style={[gstyles.row, { height: 140 }]}>
                    <View style={styles.items}>
                        <TouchableOpacity style={styles.itemsTouchable}
                            onPress={() => this.navigateToScreen('ShopPage')}>
                            <View>
                                <ShopIcon size={30} />
                                <Text style={styles.itemsText}>Shop</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.items}>
                        <TouchableOpacity style={{ padding: 20 }}
                            onPress={() => this.navigateToScreen('BagPage')}>
                            <View>
                                <BagIcon size={30} />
                                <Text style={styles.itemsText}>Bag</Text>
                                <Badge
                                    badgeStyle={{ backgroundColor: colors.yellow }}
                                    value={cartItems.length}
                                    containerStyle={{ position: 'absolute', top: 0, right: -6 }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[gstyles.row, { height: 140 }]}>
                    <View style={styles.items}>
                        <TouchableOpacity style={styles.itemsTouchable}>
                            <View style={gstyles.center}>
                                <FIcon name="sun" size={37} color="white" />
                                <Text style={styles.itemsText}>Shop</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.items}>
                        <TouchableOpacity style={{ padding: 20 }}>
                            <View style={gstyles.center}>
                                <EIcon name="location" size={50} color="white" />
                                <Text style={styles.itemsText}>Bag</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View><FancyLine backgroundColor="#585858" color="#585858" /></View>
                {[{ text: 'My Account' }, { text: 'Customer Support' }, { text: 'Logout', textColor: colors.yellow }]
                    .map((item, index) => {
                        return <View key={index} >
                            <TouchableOpacity style={styles.smallItems}>
                                <Text style={[styles.itemsText, { color: item.textColor || "white" }]}>{item.text}</Text>
                            </TouchableOpacity>
                        </View>
                    })}
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Text style={{ ...gstyles.upperText, color: '#7E7E7E', paddingBottom: 10 }}>Follow Us</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        {[{ iconName: 'facebook' }, { iconName: 'twitter' }, { iconName: 'pinterest' }]
                            .map((item, index) => {
                                return <PolygonIcon key={index} stroke="#404040" strokeWidth={3} color="none" size={70} style={{ paddingHorizontal: 10 }}>
                                    <PolygonIcon color="#404040" size={60} style={{ paddingHorizontal: 10 }}>
                                        <FAIcon name={item.iconName} size={25} color="rgba(255,255,255,0.1)" />
                                    </PolygonIcon>
                                </PolygonIcon>
                            })}

                    </View>
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.darkText,
        flex: 1,
    },
    items: {
        flex: 1,
        borderWidth: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderColor: '#585858',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    smallItems: {
        borderColor: '#585858',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        height: 60
    },
    itemsText: {
        ...gstyles.textStyle,
        color: 'white',
        fontSize: 16,
        paddingTop: 5,
    },
    itemsTouchable: {
        padding: 20,
    }
})


export default SideBar;