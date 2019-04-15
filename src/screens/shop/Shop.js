import React, { Component } from 'react';
import {createAppContainer} from 'react-navigation'
import { View, Text } from 'react-native';
import AppNavigator from './Routes'
const AppContainer = createAppContainer(AppNavigator);

export default class Shop extends Component {
    static navigationOptions = {
        header: null
    }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppContainer />
    );
  }
}
