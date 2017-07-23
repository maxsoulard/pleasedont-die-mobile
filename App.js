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
        SensorScreen: {screen: SensorScreen},
    }, {  
        navigationOptions: { 
            headerStyle: {backgroundColor: '#e0bc00', elevation: null}, 
        } 
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