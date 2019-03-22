import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import { green, white } from '../utils/colors';
import { getDecks } from '../utils/api';
import { AppLoading } from "expo";
import { formatNumberOfQuestions } from '../utils/helpers';

export default class DeckList extends Component {
    state = {
        decks: {},
        ready: false,
    };
    
    componentDidMount() {
        getDecks()
          .then((decks) => this.setState(() => ({ ready: true, decks: decks })));
    }

    componentDidUpdate(prevState) {
        if(prevState.decks !== this.state.decks){
            getDecks().then((decks) => this.setState(() => ({ ready: true, decks: decks})))
        }
    }

    render() {
        const { ready, decks } = this.state;

        if(!ready){
            return <AppLoading />
        }

        return (
            <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.appTitle}>Welcome to</Text>
                <Text style={styles.appTitleMiddle}>Mobile Flashcards</Text>
                <Text style={styles.callToAction}>Start learning now!</Text>
            {Object.keys(decks).map(deck => {
                const { title, questions } = decks[deck];
                return (
                  <TouchableOpacity key={deck} style={styles.deck} onPress={() => this.props.navigation.navigate("Deck", { entryId: deck })
                  }>
                    <Text style={styles.deckTitle}>{title}</Text>
                    <Text style={styles.cardNumber}>
                      {questions ? formatNumberOfQuestions(questions) : null}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 70
    },
    appTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    appTitleMiddle: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        color: green
    },
    callToAction: {
        fontSize: 20,
        fontWeight: 'normal',
        textAlign: 'center',
        marginBottom: 50,
        marginTop: 20
    },
    deck: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        margin: 10,
        backgroundColor: green,
        height: 140,
        width: '100%'
      },
      deckTitle: {
        fontSize: 32,
        marginBottom: 10,
        marginTop: 15,
        color: white,
      },
      cardNumber: {
        fontSize: 20,
        color: white,
        marginBottom: 10,
      }
});