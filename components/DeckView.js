import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {getDecks} from "../utils/api";
import {formatNumberOfQuestions} from "../utils/helpers";
import {
    green,
    orange,
    white,
    black,
    gray,
    darkGray
} from "../utils/colors";
import {bold} from 'ansi-colors';

export default class DeckView extends Component {
    state = {
        ready: false,
        decks: {}
    };

    componentDidMount() {
        getDecks().then((decks) => this.setState(() => ({ready: true, decks: decks})));
    }
    render() {
        const decks = this.state.decks;
        const deck = decks[this.props.navigation.state.params.entryId];

        return (
            <View style={styles.container}>
                <View style={styles.deckCard}>
                    <Text style={styles.title}>
                        {deck && deck.title}
                    </Text>
                    <Text style={styles.cardNumber}>
                        {deck && formatNumberOfQuestions(deck.questions)}
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.btnAddQuestion}
                    onPress={() => this.props.navigation.navigate("AddQuestion", {entryId: deck.title})}>
                    <Text style={styles.buttonText}>Add Question</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btnStartQuiz}
                    onPress={() => this.props.navigation.navigate("Quiz", {entryId: deck})}>
                    <Text style={styles.buttonText}>Start Quiz</Text>
                </TouchableOpacity>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start"
    },
    deckCard: {
        width: '100%',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: darkGray,
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 30,
        backgroundColor: gray
    },
    title: {
        justifyContent: 'center',
        alignItems: 'stretch',
        fontSize: 35,
        fontWeight: 'bold',
        color: white,
        marginTop: 60,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20
    },
    cardNumber: {
        justifyContent: 'center',
        alignItems: 'stretch',
        fontSize: 20,
        color: white,
        marginBottom: 80,
        marginLeft: 20,
        marginRight: 20
    },
    btnAddQuestion: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: orange,
        color: white,
        height: 60,
        width: 200,
        marginBottom: 30,
        borderRadius: 10
    },
    btnStartQuiz: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: green,
        color: white,
        height: 60,
        width: 200,
        marginBottom: 30,
        borderRadius: 10
    },
    buttonText: {
        color: white,
        fontSize: 15
    }
});
