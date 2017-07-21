import React from 'react';
import axios from 'axios';
import { StyleSheet, ActivityIndicator, Text, View } from 'react-native';
import TemperatureSensor from './TemperatureSensor';
import PlantSensor from './PlantSensor';

export default class Sensor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sensor: {}
        };

        this.getSensorData();
    }

    getSensorData() {
        axios.get('http://192.168.0.17:8888/sensors/'+ this.props.sensor._id +'/data')
            .then((response) => {
                this.setState({sensor: response.data});
            });
    }

    render () {
        switch(this.props.sensor.type) {
            case 'temperature':
                return (
                    <TemperatureSensor sensor={this.state.sensor}/>
                );
                break;
            case 'plant':
                return (
                    <PlantSensor sensor={this.state.sensor}/>
                );
                break;
            default:
                return (
                    <View>
                        <ActivityIndicator color='blue' animating={true}/>
                    </View>
                );
        }
    }
}

const styles = StyleSheet.create({
    sensorslist: {
        marginTop: 100
    }
});