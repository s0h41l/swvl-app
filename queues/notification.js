const Queue = require('bull');
const { Op } = require('sequelize');
const models = require('../models');

const REDIS_HOST = process.env.REDIS_HOST || 'localhost'
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const queues = {
    textNotificationQueue: new Queue(
        'text-notification-queue',
        `redis://${REDIS_HOST}:${REDIS_PORT}`
        ),
    pushNotificationQueue: new Queue(
        'push-notification-queue',
        `redis://${REDIS_HOST}:${REDIS_PORT}`
        )
}


queues.textNotificationQueue.process((job, done) => {
    try {

        const { user, content } = job.data;

        // Here we can implement SMS provider api call
        console.log(`Sending "${content[user.language].body}" to ${user.mobile}`);

        done();   
    } catch (error) {
        done(error)
    }
});

queues.pushNotificationQueue.process((job, done) => {
    try {

        const { user, content } = job.data;

        // Here we can implement push notification emit functionality
        // For socket.io implement we need store socket id of user everytime he log in with new device
        console.log(
            `Sending "title: ${content[user.language].title}" \n 
            body: ${content[user.language].body} to user with id ${user.id}`
            );

        done();   
    } catch (error) {
        done(error)
    }
});

module.exports = {
    sendIndividualTextNotification: async (userIds, content) => {   

        const options = {
            attributes: [
                'id',
                'mobile',
                'language'
            ],
            where: {
               id: {
                 [Op.in]: userIds
               }
            }
        }
    
        const users = await models.user.findAll(options);

        users.forEach(user => {
            queues.textNotificationQueue.add({user, content});
        })

    },
    sendIndividualPushNotification: async (userIds, content) => {

        const options = {
            attributes: [
                'id',
                'mobile',
                'language'
            ],
            where: {
               id: {
                 [Op.in]: userIds
               }
            }
        }
    
        const users = await models.user.findAll(options);

        users.forEach(user => {
            queues.pushNotificationQueue.add({user, content});
        });
    },
    sendGroupTextNotification: async (groupIds, content) => {

    },
    sendGroupPushNotification: async (groupIds, content) => {

    }
}
