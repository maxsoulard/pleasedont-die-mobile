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
                <View style={styles.informationsContainer}>
                    <Text style={styles.title}>Adresse MAC du capteur : </Text>
                    <Text>{sensor._id}</Text>
                </View>
                <View style={styles.informationsContainer}>
                    <Text style={styles.title}>Abonnés aux notifications : </Text>
                </View>
                <View style={styles.subscribersList}>
                    <ListView
                        dataSource={ds.cloneWithRows(sensor.subscribers)}
                        renderRow={(rowData) => 
                            <Subscriber subscriber={rowData} />}
                    />
                </View>
                <View style={styles.addContainer}>
                    <Text style={styles.touchableAddMail}>+ Ajouter une adresse mail</Text>
                </View>
            </View>
        );
    }
}

const Subscriber = ({subscriber}) => {
    return (
        <View style={styles.subscriberItem}>
            <Text>{subscriber.mail}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    informationsContainer: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 40,
        paddingRight: 40,
    },
    title: {
        fontSize: 28,
    },
    subscribersList: {
        backgroundColor: 'white',
    },
    subscriberItem: {
        borderBottomWidth: 0.3,
        borderColor: '#efefef',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 40,
    },
    touchableAddMail: {
        color: 'grey',
        paddingBottom: 100
    },
    addContainer: {
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
