import { StyleSheet } from 'react-native'

const colors = {
    background: '#ffffff',
    yellow: '#EFB961',
    gray: '#454545',
    lightGray: '#F2F2F2',
    facebook: '#49659F',
    twitter: '#38A1F3',
    lightText: '#999999',
    darkText: '#454545',
    inputLine: '#C4C4C4'
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
    },
    row: {
        width: '100%',
        flexDirection: 'row',
    },
    column: {
        flexDirection: 'column'
    },
    inputStyle: {

    },
    textInputContainer: {

    },
    textInput: {
        borderColor: colors.inputLine
    },
    button: {
        backgroundColor: colors.yellow,
        width: '100%',
        height: 55,
        borderWidth: 0,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
    },
    buttonTitle: {
        fontFamily: 'Source Sans Pro',
        color: colors.gray,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 18
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 10
    }
})

export {
    colors,
    gstyles
}