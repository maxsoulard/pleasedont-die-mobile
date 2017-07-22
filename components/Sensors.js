import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, ActivityIndicator, ListView } from 'react-native';
import Sensor from './Sensor'

export default class Sensors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            sensors: null
        };

        this.getSensors();
    }

    getSensors() {
        axios.get('http://192.168.0.17:8888/sensors')
            .then((response) => {
                this.setState({sensors: response.data});
            });
    }

    render () {
        if (this.state.sensors !== null) {
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            return (
                <View style={styles.container}>
                    <Text>Capteurs</Text>
                    <ListView
                        contentContainerStyle={styles.list}
                        dataSource={ds.cloneWithRows(this.state.sensors)}
                        renderRow={(rowData) => <View style={styles.item}><Sensor sensor={rowData}/></View>}
                    />
                </View>
            );
        }
        else {
            return (
                <View>
                    <ActivityIndicator color='blue' animating={true}/>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    item: {
        backgroundColor: 'red',
        marginTop: 20,
    }
});