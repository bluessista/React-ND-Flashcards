import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { white, green, black } from './utils/colors';
import { setDailyNotification } from './utils/helpers';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// components
import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import AddQuestion from './components/AddQuestion';
import DeckView from './components/DeckView';
import Quiz from './components/Quiz';

const Tabs = createBottomTabNavigator({
    Home : {
        screen: DeckList,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor, horizontal }) => <MaterialCommunityIcons name='home' size={30} color={tintColor} />
        },
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
            tabBarLabel: 'Add Deck',
            tabBarIcon: ({ tintColor, horizontal }) => <MaterialCommunityIcons name='plus' size={30} color={tintColor} />
        },
    }
  }, {
    tabBarOptions: {
        activeTintColor: green,
        labelStyle: {
            fontSize: 20
        },
        style: {
            height: 56,
            backgroundColor: white,
            paddingTop: 5
        }
    }
});

const MainNavigator = createStackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions: {
            header: null
        }
    },
    AddQuestion: {
        screen: AddQuestion,
        navigationOptions: {
            title: 'Add Question',
            headerTintColor: white,
            headerTitleSize: {
                fontSize: 20
            },
            headerStyle: {
                backgroundColor: black,
            }
        }
    },
    Deck: {
        screen: DeckView,
        navigationOptions: {
            title: 'Deck Details',
            headerTintColor: white,
            headerTitleSize: {
                fontSize: 20
            },
            headerStyle: {
                backgroundColor: black,
            }
        }
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            title: 'Quiz',
            headerTintColor: white,
            headerTitleSize: {
            fontSize: 20
            },
            headerStyle: {
                backgroundColor: black,
            }
        }
    }
},
{
  initialRouteName: "Home"
}
);

const AppContainer = createAppContainer(MainNavigator);

export default class App extends Component {
    componentDidMount() {
        setDailyNotification();
    }

    render() {
        return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
            <AppContainer />
        </SafeAreaView>
        );
    }
}
