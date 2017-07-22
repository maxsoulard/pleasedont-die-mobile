/**
 * App
 * @flow
 */

// React
import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {StatusBar, Platform} from 'react-native';

// Components
import HomeScreen from './components/HomeScreen';
import SensorScreen from './components/SensorScreen';

const Router = StackNavigator({
        Home: {screen: HomeScreen}, 
    }, { 
        navigationOptions: {
            headerStyle: {backgroundColor: 'yellow', elevation: null, paddingTop: StatusBar.height},
        }
    }, 
    {
        initialRouteName: 'HomeScreen',
    });

export default class App extends React.Component {
    static navigationOptions = {
        title: 'PleaseDont-die',
    };

    render() {
        return (
            <Router style={{marginTop: StatusBar.height}} />
        );
    }
}