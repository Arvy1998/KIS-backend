import Reading from 'models/Reading';
import Notification from 'models/Notification';
import User from 'models/User';

import * as firebase from 'firebase-admin';

import { Service } from 'aws-sdk';

const createReading = async (reading, userId) => {
  const newReading = await Reading.create(reading);

  const notification = await Notification.findOne({
    serviceId: newReading.serviceId,
  });

  if (notification && notification.triggerValue <= newReading.value) {
    const user = await User.findOne({
      _id: userId,
    });

    const service = await Service.findOne({
      _id: newReading.serviceId,
    });

    const registrationToken = user.token;

    const message = {
      notification: {
        title: `Skaitliukas ${service.title}`,
        body: `Per didelis suvartojimas užregistruotas. Reikšmė: ${newReading.value}`,
      },
      token: registrationToken,
    };

    firebase.messaging().send(message)
      .then((response) => {
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });
  }

  return newReading;
};

export default createReading;
