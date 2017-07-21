import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Sensors from './components/Sensors'

export default class App extends React.Component {
  render() {
    console.log('App');
    return (
      <View style={styles.maincontainer}>
        <View style={styles.container}>
          <Text>Pleasedont-die !</Text>
        </View>
        <View style={styles.sensorscontainer}>
          <Sensors />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sensorscontainer: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
