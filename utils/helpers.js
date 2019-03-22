import React from "react";
import { AsyncStorage, Text } from "react-native";
import { Notifications, Permissions } from "expo";

const NOTIFICATION_KEY = "flashcards: notifications";


function getDailyNotification() {
    return {
        title: "⏰ Don't forget to learn today...!",
        body: 'You ask us to remind you for a notification, here it is!',
        ios: {
            sound: true,
        },
        android: {
            sound: true, 
            sticky: false,
            vibrate: true
        }
    }
};

export function clearDailyNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}


export function setDailyNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
        if (data === null) {
            Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
                if (status === 'granted') {
                    
                    Notifications.cancelAllScheduledNotificationsAsync();

                    let tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    tomorrow.setHours(20);
                    tomorrow.setMinutes(0);
                    
                    Notifications.scheduleLocalNotificationAsync(getDailyNotification(), { time: tomorrow,  repeat: 'day' });
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