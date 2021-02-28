import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const logo = require('../assets/images/logo.jpg')

export default class Splash extends Component {
    constructor(props) {
        super(props)
        setTimeout(() => {
            this.props.navigation.navigate('Login');
        }, 2000);
    }
    render() {
        return (
            <View style={styles.container}>
                <Image source={logo} style={styles.logo}></Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    logo: {
        height: 200,
        width: 330,
    },
});
