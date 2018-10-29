import React from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_FLASHCARDS = 'flashcards:notifications'

export function createNotification() {
  return {
		title: "Strengthen your language learning skills",
		body: "Don't forget to use Learn spanish cards",
		ios: {
		  sound: true
		},
	}
}

export function clearLocalNotification(){
	return AsyncStorage.removeItem(NOTIFICATION_FLASHCARDS)
	.then(Notifications.cancelAllScheduledNotificationsAsync)	
}

export function setLocalNotification(){
	AsyncStorage.getItem(NOTIFICATION_FLASHCARDS)
	.then(JSON.parse)
	.then(data => {
	if (data === null) {
		Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
				Notifications.cancelAllScheduledNotificationsAsync();

				let tomorrow = new Date();
				tomorrow.setDate(tomorrow.getDate() + 1);
				tomorrow.setHours(18);
				tomorrow.setMinutes(0);

				Notifications.scheduleLocalNotificationAsync(
					createNotification(),
					{
						time: tomorrow,
						repeat: 'day'
					});
				AsyncStorage.setItem(NOTIFICATION_FLASHCARDS, JSON.stringify(true));
			}
		});
	}
})
}