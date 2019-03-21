import React, {Component} from "react";
import {
    StyleSheet,
    KeyboardAvoidingView,
    Text,
    Button,
    TextInput,
    TouchableOpacity
} from "react-native";
import {gray, white, black, orange} from "../utils/colors";
import {saveDeckTitle} from "../utils/api";
import { StackActions } from 'react-navigation';

export default class AddDeck extends Component {
    state = {
        deckTitle: ''
    };

    submit = () => {
        const {deckTitle} = this.state;
        pushAction = StackActions.push({  
            routeName: 'Home',
            params: {entryId: deckTitle},
        });

        saveDeckTitle(deckTitle).then(() => this.props.navigation.dispatch(pushAction))
        this.setState({deckTitle: ''});
    };

    render() {
        const {deckTitle} = this.state;
        return (
            <KeyboardAvoidingView style={styles.container}>
                <Text style={styles.deckTitle}>
                    Enter a title for your new deck:
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={input => this.setState({deckTitle: input})}
                    value={deckTitle}
                    placeholder='enter a title here'/>
                <TouchableOpacity
                    style={styles.btn}
                    disabled={deckTitle === ''}
                    onPress={this.submit}>
                    <Text style={{
                        color: white
                    }}>Create Deck</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    deckTitle: {
        fontSize: 25,
        color: black,
        marginBottom: 18,
        marginTop: 80,
        height: 80,
        marginLeft: 20,
        marginRight: 20
    },
    input: {
        fontSize: 14,
        alignSelf: 'stretch',
        borderColor: gray,
        borderWidth: 1,
        borderRadius: 2,
        marginBottom: 18,
        height: 60,
        fontSize: 20,
        marginLeft: 20,
        marginRight: 20,
        padding: 14,
        textAlign: 'center'
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
