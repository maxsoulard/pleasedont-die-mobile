/**
 * PlantSensor
 * @flow
 */

import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';

export default class Sensor extends React.Component {
    constructor(props) {
        super(props);
    }
    
    _toSensorScreen() {
        this.props.navigation.navigate('SensorScreen', {sensor: this.props.sensor});
    }

    render () {
        let icon;
        if (this.props.data.moisture <= 500)         icon = <Text>💧</Text>
        else if (this.props.data.moisture <= 400)    icon = <Text>💧💧 ⚠️</Text>
        else if (this.props.data.moisture <= 300)    icon = <Text>💧💧💧 ☠️</Text>
        
        return (
            <TouchableHighlight style={styles.touchablecontainer} onPress={this._toSensorScreen.bind(this)}>
                <Image
                    style={styles.plant}
                    source={require('../assets/plant.png')}>
                    <View style={styles.container}>
                        <View style={styles.subcontainer}>
                            <Text style={styles.title}>PLANTE</Text>
                        </View>
                        <View style={styles.iconcontainer}>{icon}</View>
                        <Text style={styles.data}>Last update : {this.props.data.date}</Text>
                        <Text style={styles.data}>Valeur brute : {this.props.data.moisture}</Text>
                    </View>
                </Image>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    touchablecontainer: {
        flex: 1
    },
    plant: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
        width: null,
        height: null,
        opacity: 50,
    },
    container: {
        flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 40,
    },
    subcontainer: {
        flex: 0,
        flexDirection: 'row'
    },
    iconcontainer: {
    },
    title: {
        color: 'white',
        fontSize: 28,
    },
    data: {
        color: 'white',
    },
});
