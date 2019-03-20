import React, { Component } from "react";
import { StyleSheet, KeyboardAvoidingView, Text, TextInput, TouchableOpacity } from "react-native";
import { orange, gray, white, black } from "../utils/colors";
import { addCardToDeck, getDecks } from "../utils/api";

export default class AddQuestion extends Component {
    state = {
        decks: {},
        answer: '',
        question: ''
    };

    componentDidMount() {
        getDecks()
            .then((decks) => this.setState(() => ({ ready: true, decks: decks })));
    }

    submit = () => {
        const card = {question: this.state.question, answer: this.state.answer}

        const title = this.props.navigation.state.params.entryId
        addCardToDeck(title, card)
            .then(() => this.props.navigation.navigate('Deck', { entryId: this.props.navigation.state.params.entryId }))
            this.setState({ question: '', answer: '' })
    };
  
    render() {
        const { question, answer } = this.state;
      return (
            <KeyboardAvoidingView style={styles.container}>
                <Text style={styles.questionTitle}>Add a new question to your deck</Text>
                <TextInput
                    placeholder="add your question"
                    onChangeText={input => this.setState({ question: input })}
                    value={question}
                    style={styles.input}
                />
                <TextInput
                    placeholder="add the correct answer"
                    onChangeText={input => this.setState({ answer: input })}
                    value={answer}
                    style={styles.input}
                />
                <TouchableOpacity style={styles.btn} onPress={this.submit} disabled={answer === '' || question === ''}>
                    <Text style={{color: white}}>Add Question</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 70
    },
    questionTitle: {
        justifyContent: 'center',
        alignItems: 'stretch',
        fontSize: 25,
        color: black,
        marginBottom: 18,
        marginTop: 80,
        height: 80,
        marginLeft: 20,
        marginRight: 20
    },
    input: {
        justifyContent: 'center',
        alignSelf: 'stretch',
        textAlign: 'center',
        fontSize: 16,
        fontSize: 20,
        borderColor: gray,
        borderWidth: 1,
        marginBottom: 20,
        height: 60,
        marginLeft: 20,
        marginRight: 20,
        padding: 16
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: orange,
        color: white,
        height: 60,
        width: 200,
        marginBottom: 30,
        borderRadius: 10
    }
});