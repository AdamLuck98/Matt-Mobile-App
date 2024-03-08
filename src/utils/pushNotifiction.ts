import React from 'react';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from "@react-native-community/async-storage";
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
}

export const HandleNotification = () => {
  const showToast = (notificationData:any) => {
    Toast.show({
      type: 'success',
      text1: notificationData?.body,
      text2: notificationData?.title
    });
  }
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  messaging().onMessage(async (remoteMessage) => {
     showToast(remoteMessage?.notification)
     })
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
}