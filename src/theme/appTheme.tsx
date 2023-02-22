import { StyleSheet } from 'react-native';

// const lightColor = '#C4D3E3';
// const darkColor = '#090B11';
// const lightGrayColor = '#95A1AE';
// const darkGrayColor = '#50575F';
// const GrayColor = '#757F8A';


export const styles = StyleSheet.create({
    // globalColor: {
    //     backgroundColor: lightColor,
    // },
    globalContainer: {
        marginHorizontal: 10,
    },
    title: {
        color: '#090B11',
        fontSize: 24,
        fontWeight: 'bold',
    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 100,
    },
    menuContainer: {
        marginVertical: 30,
        marginHorizontal: 30,
    },
    menuButton: {
        marginVertical: 10,
    },
    menuText: {
        fontSize: 20,
    },
});
