// Libs
import _ from 'lodash';
import axios from 'axios';

// React
import React from 'react';
import { StyleSheet, View, Text, ListView, TouchableHighlight, Button, TextInput } from 'react-native';
import CheckBox from 'react-native-check-box'

export default class SensorScreen extends React.Component {
    static navigationOptions = {
        title: 'Paramètres du capteur',
    };

    constructor(props) {
        super(props);
        this.state = {
            sensor: props.navigation.state.params.sensor,
            subscribers: [],
            selectedSubscribers: [],
            name: props.navigation.state.params.sensor.name
        };
    }

    componentDidMount() {
        this._getSensor();
    } 

    _getSensor() {
        const getUrl = `http://home.maximesoulard.fr:8888/api/sensors/${this.state.sensor._id}`;
        axios.get(getUrl)
            .then((response) => {
                _.each(this.state.subscribers, (subscriber) => subscriber.checked = false);
                this.setState({subscribers: response.data.subscribers});
            })
            .then(() => this.setState({selectedSubscribers: []}));
    }

    _toNewSubscriberScreen() {
        this.props.navigation.navigate('NewSubscriberScreen', {sensor: this.state.sensor, refresh: () => this._getSensor()});
    }

    _deleteSubscribers() {
        _.each(this.state.selectedSubscribers, (subscriberToDelete) => {
            const deleteUrl = `http://home.maximesoulard.fr:8888/api/sensors/${this.state.sensor._id}/subscribers/${subscriberToDelete.mail}`;
            axios.delete(deleteUrl)
                .then(this._getSensor.bind(this));
        });
    }

    _selectSubscriber(subscriber) {
        let selectedSubscribers = this.state.selectedSubscribers;
        if (!subscriber.checked) { // not already checked
            selectedSubscribers.push(subscriber);
            subscriber.checked = true;
        }
        else {
            selectedSubscribers = _.without(selectedSubscribers, subscriber);
            subscriber.checked = false;
        }
        this.setState({selectedSubscribers: selectedSubscribers});
    }

    _save() {
        this.state.name && this._setName();
        this.state.warninglevel && this._setLevel();
    }

    _setName() {
        axios.patch(`http://home.maximesoulard.fr:8888/api/sensors/${this.state.sensor._id}`, { name: this.state.name })
            .then(() => this.props.navigation.state.params.refresh());
    }

    _setLevel() {
        axios.patch(`http://home.maximesoulard.fr:8888/api/sensors/${this.state.sensor._id}`, { warninglevel: this.state.warninglevel })
            .then(() => this.props.navigation.state.params.refresh());
    }

    render() {
        const sensor = this.state.sensor;
        const subscribers = this.state.subscribers;
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const sensorName = this.state.name ? this.state.name.toUpperCase() : 'NAME';

        return (
            <View style={styles.container}>
                <View style={styles.informationsContainer}>
                    <Text style={styles.title}>Nom : </Text>
                    <TextInput
                        style={{height: 40}}
                        placeholder={sensorName}
                        onChangeText={(name) => this.setState({name})}
                        />
                </View>
                <View style={styles.informationsContainer}>
                    <Text style={styles.title}>NOTIFICATIONS</Text>
                </View>
                <View style={styles.informationsContainer}>
                    <Text style={styles.subtitle}>Abonnés : </Text>
                </View>
                <View style={styles.subscribersList}>
                    <ListView
                        dataSource={ds.cloneWithRows(subscribers)}
                        renderRow={(rowData) => 
                            <View style={styles.subscriberItem}>
                                <CheckBox
                                    onClick={()=>this._selectSubscriber(rowData)}
                                    isChecked={rowData.checked}
                                    style={{paddingRight: 20}}
                                />
                                <Text>{rowData.mail}</Text>
                            </View>}
                    />
                </View>
                <View style={styles.informationsContainer}>
                    <Text style={styles.subtitle}>Seuil d'alerte : </Text>
                    <TextInput
                        style={{height: 40}}
                        placeholder='Warning level (200 to 800)'
                        onChangeText={(warninglevel) => this.setState({warninglevel})}
                        />
                </View>
                <SubscribersActionButtons 
                    onAddNewSubscriber={this._toNewSubscriberScreen.bind(this)}
                    onDeleteSubscribers={this._deleteSubscribers.bind(this)}
                    state={this.state}
                />
                
                {typeof this.state.name !== 'undefined' &&
                <View style={styles.informationsContainer}>
                    <Button
                        onPress={() => this._save()}
                        title="Enregistrer"
                        color="#e0bc00"
                        accessibilityLabel="Enregistrer"
                    />
                </View>
                }
            </View>
        );
    }
}

const SubscribersActionButtons = ({onAddNewSubscriber, onDeleteSubscribers, state}) => {
    return (
        <View style={styles.informationsContainer}>
            {state.selectedSubscribers.length > 0 &&
                <Button
                    onPress={onDeleteSubscribers}
                    title="Supprimer"
                    color="#cf0000"
                    accessibilityLabel="Supprimer une adresse mail"
                />
            }
            <View style={{paddingTop: 20}}>
                <Button
                    onPress={onAddNewSubscriber}
                    title="Ajouter une adresse mail"
                    color="#e0bc00"
                    accessibilityLabel="Ajouter une adresse mail"
                />
            </View>
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
    subtitle: {
        fontSize: 16,
    },
    subscribersList: {
        backgroundColor: 'white',
    },
    subscriberItem: {
        flexDirection: "row",
        borderBottomWidth: 0.3,
        borderColor: '#efefef',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
    },
    buttonContainer: {
        margin: 20,
        flex: 1,
    },
});
