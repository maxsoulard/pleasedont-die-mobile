import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class Sensor extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Image
                style={styles.temperature}
                source={require('../assets/temperature.png')}>
                <View style={styles.container}>
                    <Text style={styles.title}>TEMPERATURE</Text>
                    <Text style={styles.data}>Température : {this.props.sensor.temp}</Text>
                    <Text style={styles.data}>Humidité : {this.props.sensor.hum}</Text>
                </View>
            </Image>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontSize: 28
    },
    data: {
        color: 'white'
    },
    container: {
        flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 40,
    },
    temperature: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
        width: null,
        height: null,
        opacity: 50,
    }
});