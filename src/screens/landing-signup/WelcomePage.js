
import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import AIcon from 'react-native-vector-icons/AntDesign'
import Svg,{Rect} from 'react-native-svg';
import AsyncStorage from '@react-native-community/async-storage';

const wp1 = require('./../../assets/images/welcomepage1.png')
const wp2 = require('./../../assets/images/welcomepage2.png')
const wp3 = require('./../../assets/images/welcomepage3.png')

const welcomePages = [
    { id: 0, imageUrl: wp1, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec.' },
    { id: 1, imageUrl: wp2, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec.' },
    { id: 2, imageUrl: wp3, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec.' }
]
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const CustomDot = (props) => {
    return <Svg width={27} height={27}>
        <Rect x={7.5} originX={7.5} originY={7.5} width={15} height={15} fill={props.active? "rgba(239,185,97,1)": "#d8d8d8"} rotation={45}/>
    </Svg>
}

@inject()
@observer
export default class WelcomePage extends Component {
    constructor(props) {
        super(props)
        this.currentPageId = 0
    }

    static navigationOptions = {
        header: null
    }

    @observable currentPageId = 0

    _renderItem({ item, index }) {
        return (
            <View style={styles.slide}>
                <Image source={item.imageUrl} style={{ resizeMode: 'cover', width: '100%', height: '85%' }} />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <Text style={styles.title}>{item.text}</Text>

                </View>

            </View>
        );
    }

    next = async () => {
        if (this.currentPageId < welcomePages.length - 1) {
            this._carousel.snapToNext();
        }
        else {
            await AsyncStorage.setItem('@showWelcomPages', 'false')
            this.props.navigation.replace('SignInPage')
        }

    }

    onStapToItem = (index) => {
        this.currentPageId = welcomePages[index].id
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ flex: 1 }}>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={welcomePages}
                        renderItem={this._renderItem}
                        sliderWidth={viewportWidth}
                        itemWidth={viewportWidth}
                        slideStyle={{ width: viewportWidth }}
                        onSnapToItem={this.onStapToItem}
                    />
                    <Pagination
                        containerStyle={{height: 30}}
                        dotsLength={welcomePages.length}
                        activeDotIndex={this.currentPageId}
                        dotElement={<CustomDot />}
                        inactiveDotElement={<CustomDot />} />
                </View>
                <TouchableOpacity
                    onPress={() => this.next()}
                    activeOpacity={0.3}
                    style={{}}>
                    <View style={{ backgroundColor: 'rgba(45,45,45,1)', height: 55, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <Text style={styles.buttonText}>CONTINUE </Text>
                        <AIcon name="caretright" size={25} color="white"></AIcon>
                    </View>
                </TouchableOpacity>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Source Sans Pro',
        color: 'rgba(45,45,45,1)',
        fontSize: 16,
        textAlign: 'center',
        padding: 10
    },
    buttonText: {
        fontFamily: 'Source Sans Pro',
        color: 'white',
        fontSize: 25,
        textAlign: 'center',
        padding: 10
    }
});