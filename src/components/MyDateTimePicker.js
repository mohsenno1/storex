import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { gstyles, colors } from '../shared/Constants';
import { Input } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';

@inject()
@observer
export default class MyDateTimePicker extends Component {
    constructor(props) {
        super(props);
        isDateTimePickerVisible = false
        this.date = props.value
        this.errorMessage = props.errorMessage
    }

    @observable isDateTimePickerVisible
    @observable date

    _handleDatePicked = (date) => {
        this.isDateTimePickerVisible = false
        this.date = date
        if(this.props.onChangeValue)
            onChangeValue(date)
    };

    render() {
        const date = this.date
        return (
            <View style={[this.props.style, { paddingHorizontal: 10 }]}{...this.props}>
                <Text style={[gstyles.upperText, styles.label]}>{this.props.label || 'Date Of Birth'}</Text>
                <TouchableWithoutFeedback onPress={() => { this.isDateTimePickerVisible = true }}>
                    <View style={gstyles.row}>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <Text style={styles.labels}>{this.props.dateLabel || 'DD'}</Text>
                            <View style={{ borderBottomWidth: 2, borderBottomColor: colors.inputLine }}>
                                <Text style={styles.values}>{date ? date.getDate() : null}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, paddingHorizontal: 10 }}>
                            <Text style={styles.labels}>{this.props.monthLabel || 'MM'}</Text>
                            <View style={{ borderBottomWidth: 2, borderBottomColor: colors.inputLine }}>
                                <Text style={styles.values}>{date ? date.getMonth() : null}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.labels}>{this.props.yearLabel || 'YYYY'}</Text>
                            <View style={{ borderBottomWidth: 2, borderBottomColor: colors.inputLine }}>
                                <Text style={styles.values}>{date ? date.getFullYear() : null}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <DateTimePicker
                    datePickerModeAndroid="spinner"
                    date={this.date}
                    isVisible={this.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={() => this.isDateTimePickerVisible = false }
                />
                {this.errorMessage && <Text style={{color: 'red', paddingVertical: 10 }}>{this.errorMessage}</Text>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    label: {
        color: colors.lightText,
        fontSize: 14,
        fontFamily: 'Source Sans Pro',
    },
    labels: {
        paddingTop: 2,
        color: '#454545',
        fontSize: 16,
        fontFamily: 'Source Sans Pro',
    },
    values: {
        fontSize: 20,
        textAlign: 'center',
        paddingBottom: 8,
        paddingTop: 4,
        paddingHorizontal: 10
    }
});
