import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SwitchSelector from "react-native-switch-selector";
import { observable } from 'mobx';
import { colors, gstyles } from '../shared/Constants';

export default class MySwitchSelector extends Component {
    constructor(props) {
        super(props);
        if (props.options)
            this.options = props.options
    }

    options = [
        { label: "Male", value: "1" },
        { label: "Female", value: "1.5" },
    ];
    @observable selectedIndex
    @observable selectedValue

    renderItem = (index) => {
        return <View>
            <Text>{index}</Text>
        </View>
    }

    render() {
        return (
            <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                <View style={{ flexDirection: 'row', borderBottomColor: colors.inputLine, borderBottomWidth: 2 }}>
                    <View style={{ flex: 6 }}>
                        <Text style={[gstyles.upperText, { color: colors.lightText }]}>Select Your Gender</Text>
                    </View>
                    <View style={{ flex: 4, padding: 7 }}>
                        <SwitchSelector
                            options={this.options}
                            initial={0}
                            textColor={colors.lightText} //'#7a44cf'
                            // selectedColor={colors.white}
                            buttonColor={colors.yellow}
                            // borderColor={colors.purple}
                            renderObject={index => renderItem(index)}
                            onPress={value => console.log(`Call onPress with value: ${value}`)}
                        />
                    </View>
                </View>

            </View>

        );
    }
}
