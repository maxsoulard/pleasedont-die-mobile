/**
 * HomeScreen
 * @flow
 */

// React
import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

// Components
import Sensors from './Sensors';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'PleaseDont-die',
        header: {
            tintColor: 'deeppink',
        }
    };

    render() {
        return (
              <Sensors />
        );
    }
}

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'skyblue',
        alignItems: 'center',
        justifyContent: 'center',
    },
});