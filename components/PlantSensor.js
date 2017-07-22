/**
 * PlantSensor
 * @flow
 */

import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class Sensor extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Image
                style={styles.plant}
                source={require('../assets/plant.png')}>
                <View style={styles.container}>
                    <Text style={styles.title}>PLANTE</Text>
                    <Text style={styles.data}>Valeur brute : {this.props.sensor.moisture}</Text>
                </View>
            </Image>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontSize: 28,
    },
    data: {
        color: 'white',
    },
    container: {
        flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 40,
    },
    plant: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
        width: null,
        height: null,
        opacity: 50,
    }
});
