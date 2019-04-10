import {StyleSheet} from 'react-native'

const colors = {
    background: '#ffffff',
    yellow: '#EFB961',
    gray: '#454545',
    lightGray: '#F2F2F2',
    facebook: '#49659F',
    twitter: '#38A1F3'
}

const gstyles = StyleSheet.create({
    textStyle: {
        fontFamily: 'Source Sans Pro',
        color: colors.gray,
    },
    upperText: {
        fontFamily: 'Source Sans Pro',
        color: colors.gray,
        textTransform: 'uppercase'
    },
    linkStyle: {
        fontFamily: 'Source Sans Pro',
        color: colors.yellow,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    }
})

export {
    colors,
    gstyles
}