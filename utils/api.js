import { AsyncStorage } from 'react-native';

const UDACICARD_STORAGE_KEY = 'UdaciCards: decks';

const dummyData = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
};

export const getdummyData = () => {
    return dummyData;
};

export function getDecks() {
    return AsyncStorage.getItem(UDACICARD_STORAGE_KEY).then(results => {
      if (results) {
        return JSON.parse(results);
      } else {
        AsyncStorage.setItem(UDACICARD_STORAGE_KEY, JSON.stringify(dummyData));
        return dummyData;
      }
    });
  }