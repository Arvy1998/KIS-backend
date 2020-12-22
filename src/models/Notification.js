import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    serviceId: {
        type: String,
        index: true,
    },
    triggerValue: Number,
    deviceId: String,
    userId: String,
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
