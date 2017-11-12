/**
 * Sensor
 * @flow
 */

// React
import React from 'react';
import axios from 'axios';
import { StyleSheet, ActivityIndicator, Text, View } from 'react-native';

// Components
import TemperatureSensor from './TemperatureSensor';
import PlantSensor from './PlantSensor';

export default class Sensor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };

        this.getSensorData();
    }

    getSensorData() {
        axios.get('http://home.maximesoulard.fr:8888/api/sensors/'+ this.props.sensor._id +'/data')
            .then((response) => {
                response.data.id = this.props.sensor._id;
                this.setState({data: response.data});
            });
    }

    render () {
        switch(this.props.sensor.type) {
            case 'temperature':
                return (
                    <TemperatureSensor sensor={this.props.sensor} data={this.state.data} navigation={this.props.navigation}/>
                );
                break;
            case 'plant':
                return (
                    <PlantSensor sensor={this.props.sensor} data={this.state.data} navigation={this.props.navigation}/>
                );
                break;
            default:
                return (
                    <ActivityIndicator color='blue' animating={true}/>
                );
        }
    }
}