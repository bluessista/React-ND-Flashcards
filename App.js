import React, { Component } from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';

// components
import DeckList from './components/DeckList';

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <DeckList />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
