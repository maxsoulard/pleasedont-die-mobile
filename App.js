/**
 * App
 * @flow
 */

// React
import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import {StatusBar} from 'react-native';

// Components
import HomeScreen from './components/HomeScreen';

const Tabs = TabNavigator({
        Home: {screen: HomeScreen},
    },
    {
        tabBarOptions: { 
            style: { backgroundColor: 'orange', marginTop: StatusBar.currentHeight },
        }
    });

export default class App extends React.Component {
    static navigationOptions = {
        title: 'PleaseDont-die',
        header: {
            tintColor: 'deeppink',
        }
    };

    render() {
        return (
            <Tabs />
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