import React from 'react';
import { StyleSheet, ActivityIndicator, Text, View } from 'react-native';

export default class Sensor extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <View>
                <Text>Température : {this.props.sensor.temp}</Text>
                <Text>Humidité : {this.props.sensor.hum}</Text>
            </View>
        );
    }
}