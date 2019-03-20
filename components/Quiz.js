import React, { Component } from "react"
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native"
import { gray, white, red, green, blue, black } from "../utils/colors"
import { getDecks } from "../utils/api"

export default class Quiz extends Component {
    state = {
        ready: false,
        questionNumber: 0,
        showAnswer: false,
        correct: 0,
        incorrect: 0,
        decks: {}
    };

    componentDidMount() {
        getDecks()
        .then((decks) => this.setState(() => ({ ready: true, decks: decks })));
    }

    showAnswer = () => 
        this.state.showAnswer
        ? this.setState({ showAnswer: false })
        : this.setState({ showAnswer: true });

    correct = () => {
        this.setState({ correct: this.state.correct + 1 });
        this.countQuestionCard();
    };

    incorrect = () => {
        this.setState({ incorrect: this.state.incorrect + 1 });
        this.countQuestionCard();
    };

    countQuestionCard = () => {
        this.setState({
        questionNumber: this.state.questionNumber + 1,
        showAnswer: false
        });
    };
    restart = () => {
        this.setState({
        questionNumber: 0,
        showAnswer: false,
        correct: 0,
        incorrect: 0
        });
    };

    render() {
        const { showAnswer, decks, questionNumber, correct, incorrect } = this.state
        const deck = this.props.navigation.state.params.entryId;
        const currentNumber = this.state.questionNumber + 1;

    if (questionNumber === deck.questions.length) {
        return (
            <View style={styles.containerResult}>
                <Text style={styles.result}>
                    Your result is:
                </Text>
                <Text style={styles.result}>
                    {(correct / (incorrect + correct) * 100).toFixed(2)} %!
                </Text>
                <TouchableOpacity style={[styles.btnRestart, styles.btn]} onPress={this.restart}>
                    <Text style={styles.buttonText}>Start Again</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnBack, styles.btn]} onPress={() => this.props.navigation.navigate("Deck", { entryId: deck.title })}>
                    <Text style={styles.buttonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
            <Text style={styles.currentNumber}>
                Question {currentNumber} of {deck.questions.length}
            </Text>

            {showAnswer ? (
                <Text style={styles.text}>
                {deck.questions[questionNumber].answer}
                </Text>
            ) : (
                <Text style={styles.text}>
                {deck.questions[questionNumber].question}
                </Text>
            )}

            {showAnswer ? (
                <TouchableOpacity style={styles.answer} onPress={this.showAnswer}>
                <Text style={styles.answerText}>Show Question</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.answer} onPress={this.showAnswer}>
                <Text style={styles.answerText}>Show Answer</Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity style={[styles.btnCorrect, styles.btn]} onPress={this.correct}>
                <Text style={styles.buttonText}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnIncorrect, styles.btn]} onPress={this.incorrect}>
                <Text style={styles.buttonText}>Incorrect</Text>
            </TouchableOpacity>
            </View>
        )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    containerResult: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    currentNumber: {
        color: gray,
        fontSize: 15,
        marginBottom: 50,
        marginTop: 80
    },
    text: {
        fontSize: 25,
        color: black,
        marginTop: 0,
        textAlign: 'center',
        marginBottom: 30
    },
    result: {
        fontSize: 25,
        marginTop: 80,
        color: black,
        marginTop: 0,
        textAlign: 'center',
        marginBottom: 30
    },
    answer: {
        color: blue,
        backgroundColor: 'transparent',
        fontSize: 20,
        marginBottom: 50
    },
    answerText: {
        color: black,
        fontSize: 20,
        marginBottom: 50
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        color: white,
        height: 60,
        width: 200,
        marginBottom: 30,
        borderRadius: 10
    },
    btnRestart: {
        backgroundColor: green,
    },
    btnBack: {
        backgroundColor: gray
    },
    btnIncorrect: {
        backgroundColor: red
    },
    btnCorrect: {
        backgroundColor: green
    },
    buttonText: {
        color: white,
        fontSize: 15
    }
});