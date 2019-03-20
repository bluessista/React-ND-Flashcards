import React from "react";
import { AsyncStorage, Text } from "react-native";
import { Notifications, Permissions } from "expo";

const NOTIFICATION_KEY = "flashcards: decks";


function getDailyNotification() {
    return {
        title: "Don't forget to learn today...!"
    }
};

export function setDailyNotification() {
    
    AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
        if (data === null) {
            Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
                if (status === "granted") {
                    
                    Notifications.cancelAllScheduledNotificationsAsync();
                    
                    Notifications.scheduleLocalNotificationAsync(getDailyNotification(), { time: ((new Date()).getDate() + 1),  repeat: 'day' });
                    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                }
            });
        }
    });
};

export const formatNumberOfQuestions = questions => {
    if (questions.length > 1 || questions.length === 0) {
        return <Text>{questions.length} cards</Text>;
    } else {
        return <Text>1 card</Text>;
    }
};