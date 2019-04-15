import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Header, Image } from 'react-native-elements';
import EIcon from 'react-native-vector-icons/Entypo'
import { colors } from '../shared/Constans';
import Logo from './Logo';

export default class MyHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { routes, index } = this.props.navigation.state
    const params = routes[index].params;
    const rightComponent = params ? params.rightComponent : null

    return (
      <Header containerStyle={styles.container}
        leftComponent={<TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: -24, }}
          onPress={this.props.menuPress}>
          <EIcon name="menu" size={40} color={colors.darkText} />
        </TouchableOpacity>}
        centerComponent={
          <TouchableOpacity style={{ marginTop: -23 }}
            onPress={() => this.props.navigation.navigate('ShopPage')}>
            <Logo size={38} />
          </TouchableOpacity>
        }
        rightComponent={rightComponent}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    height: 60,
  }
})
