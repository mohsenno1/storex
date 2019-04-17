import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Logo from '../../assets/images/logo.png'
import Diamond from '../../assets/images/homePageDiamond.svg'
import { inject, observer } from 'mobx-react';
import ItemColor from '../../components/ItemColor';
import { observable } from 'mobx';
import { colors } from '../../shared/Constants';
import { Button } from 'react-native-elements';

@inject()
@observer
class HomePage extends Component {
    @observable diamondSize = 300

    constructor(props) {
        super(props)
        this.diamondSize = Dimensions.get("screen").width;
    }
    static navigationOptions = {
        header: null,
    };

    onLayout = (e) => {
        this.diamondSize = Math.min(e.nativeEvent.layout.width, e.nativeEvent.layout.height);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={Logo} resizeMode="contain" style={{ marginTop: 35, width: 100 }} />
                <Text style={styles.text}>Follow the latest fashion trends and shop with <Text style={{ color: colors.yellow }} >storex!</Text></Text>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 40, marginBottom: 40, }} onLayout={this.onLayout}>
                    <Diamond width={this.diamondSize} />
                </View>
                <Button containerStyle={{ width: '100%' }}
                    buttonStyle={{ height: 60, backgroundColor: colors.yellow, borderRadius: 0 }}
                    titleStyle={{ textTransform: 'uppercase', fontFamily: 'Source Sans Pro', fontSize: 20, fontWeight: 'bold', }}
                    title="Sign In"
                    onPress={() => this.props.navigation.navigate("SignInPage")} />
            </View>
        );
    }
}

export default HomePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'Source Sans Pro',
        fontSize: 22,
        color: colors.gray,
        paddingHorizontal: 20,
        textAlign: 'center'
    }
})
