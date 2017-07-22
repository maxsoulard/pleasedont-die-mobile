/**
 * PlantSensor
 * @flow
 */

import React from 'react';
import { StyleSheet, ActivityIndicator, Text, View } from 'react-native';

export default class Sensor extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <View>
                <Text>Plante</Text>
                <Text>Valeur brute : {this.props.sensor.moisture}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sensorslist: {
        marginTop: 100
    }
});