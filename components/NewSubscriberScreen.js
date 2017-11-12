// Libs
import axios from 'axios';

// React
import React from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

export default class NewSubscriberScreen extends React.Component {
    static navigationOptions = {
        title: 'Nouvel abonné',
    };

    constructor(props) {
        super(props);
        this.state = {
            sensor: props.navigation.state.params.sensor
        };
    }

    _postNewSubscriber() {
        const postUrl = 'http://home.maximesoulard.fr:8888/api/sensors/' + this.state.sensor._id + '/subscribers';
        const postBody = {
            "mail": this.state.mail
        }
        axios.post(postUrl, postBody)
                .then((response) => {
                    this.props.navigation.state.params.refresh();
                    this.props.navigation.goBack();
                });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.informationsContainer}>
                    <Text style={styles.title}>Adresse MAC du capteur : </Text>
                    <Text>{this.state.sensor._id}</Text>
                </View>
                <View style={styles.informationsContainer}>
                    <Text style={styles.title}>Adresse mail du nouvel abonné : </Text>
                    <TextInput
                        style={{height: 40}}
                        placeholder="Adresse mail"
                        onChangeText={(mail) => this.setState({mail})}
                    />
                </View>
                {typeof this.state.mail !== 'undefined' &&
                    <View style={styles.informationsContainer}>
                        <Button
                            onPress={() => this._postNewSubscriber()}
                            title="Valider"
                            color="#e0bc00"
                            accessibilityLabel="Valider"
                        />
                    </View>
                }
            </View>
        );
    }
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
    buttonContainer: {
        margin: 20,
        flex: 1,
    },
});
