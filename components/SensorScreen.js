// React
import React from 'react';
import { StyleSheet, View, Text, ListView } from 'react-native';

export default class SensorScreen extends React.Component {
    static navigationOptions = {
        title: 'Paramètres du capteur',
    };

    constructor(props) {
        super(props);
    }

    render() {
        const sensor = this.props.navigation.state.params.sensor;
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Adresse MAC du capteur : </Text>
                <Text>{sensor._id}</Text>
                <Text style={styles.title}>Abonnés aux notifications : </Text>
                <ListView
                    dataSource={ds.cloneWithRows(sensor.subscribers)}
                    renderRow={(rowData) => 
                        <View>
                            <Text>{rowData.mail}</Text>
                        </View>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 40,
    },
    title: {
        fontSize: 28,
    },
});