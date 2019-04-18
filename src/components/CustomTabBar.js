import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { gstyles, colors } from '../shared/Constants';
import FancyLine from './FancyLine';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';

const titles = ['Address', 'Payment', 'Review', 'A', 'B']

@inject()
@observer
export default class CustomTabBar extends Component {
    componentWillMount() {
        active = this.props.active
        this.props.list.forEach(element => {
            this.list.push(element)
        });
    }

    @observable list = []
    @observable active = 0
    
    render() {
        const activeIndex = active
        return (
            <View style={{
                width: '100%',
                flexDirection: 'row',
            }}>
                {this.list.map((item, index) => {
                    const isPassed = (index <= activeIndex)
                    const isActive = (index == activeIndex)
                    return <View key={index} style={{ flex: 1 }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }} 
                            onPress={() => { 
                                if(!isActive) 
                                    this.props.onPress(item.key) 
                            }}>
                            <View style={{ flex: 1, height: 70, ...gstyles.center }}>
                                <Text style={{ 
                                    ...gstyles.upperText, 
                                    fontSize: 16, 
                                    fontWeight: 'bold', 
                                    color: isPassed ? colors.darkText : colors.lightText 
                                }}>{titles[index]}</Text>
                                <FancyLine attach="bottom" color={isActive ? colors.yellow : colors.lightText} />
                            </View>
                        </TouchableOpacity>
                    </View>
                })}
            </View>
        );
    }
}
