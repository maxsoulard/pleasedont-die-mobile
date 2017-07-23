/**
 * HomeScreen
 * @flow
 */

import axios from 'axios';

// React
import React from 'react';
import { StyleSheet, View, ActivityIndicator, ListView, Text } from 'react-native';

// Components
import Sensor from './Sensor';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'PleaseDont-die',
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            sensors: null
        };

        this.getSensors();
    }

    getSensors() {
        axios.get('http://192.168.0.17:8888/api/sensors')
            .then((response) => {
                this.setState({sensors: response.data});
            });
    }

    render () {
        if (this.state.sensors !== null) {
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            return (
                <View style={styles.maincontainer}>
                    <ListView
                        dataSource={ds.cloneWithRows(this.state.sensors)}
                        renderRow={(rowData) => 
                            <View style={styles.item}>
                                <Sensor sensor={rowData} navigation={this.props.navigation}/>
                            </View>}
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
    maincontainer: {
        flex: 6,
        backgroundColor: '#efefef',
    },
    item: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    }
});