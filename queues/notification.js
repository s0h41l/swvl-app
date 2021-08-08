const Queue = require('bull');
const { Op } = require('sequelize');
const models = require('../models');

const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
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


queues.textNotificationQueue.process(async (job, done) => {
    const transaction  = await models.sequelize.transaction();
    try {

        const { user, content, type } = job.data;

        // Here we can implement SMS provider api call
        console.log(`Sending "${content[user.language].body}" to ${user.mobile}`);

        await models.notification.create({
            content: JSON.stringify(content[user.language]),
            userId: user.id,
            type,
        }, { transaction });

        await transaction.commit();
        done();   
    } catch (error) {
        console.log("Error:", error.message);
        await transaction.rollback();
        done(error)
    }
});

queues.pushNotificationQueue.process(async (job, done) => {
    const transaction  = await models.sequelize.transaction();
    try {

        const { user, content, type } = job.data;

        // Here we can implement push notification emit functionality
        // For socket.io implementation we need to store socket id of user everytime he logs in with new socket session
       console.log(
            `Sending "title: ${content[user.language].title}" \n 
            body: ${content[user.language].body} to user with id ${user.id}`
            );

        await models.notification.create({
            content: JSON.stringify(content[user.language]),
            userId: user.id,
            type,
        }, { transaction });

        done();   

        await transaction.commit();
    } catch (error) {
        console.log("Error:", error.message);
        await transaction.rollback();
        done(error)
    }
});

module.exports = {
    sendIndividualNotification: async (userIds, content, type = 'text') => {

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
            },
            raw: true
        }
    
        const users = await models.user.findAll(options);

        users.forEach(user => {

            if(type === 'text'){
                queues.textNotificationQueue.add({user, content, type});
            }else{
                queues.pushNotificationQueue.add({user, content, type});
            }

        });
    },
    sendGroupNotification: async (groupIds, content, type = 'text') => {
        const options = {
            attributes: [
                'id',
                'language',
                'mobile'
            ],
            include: [
                {
                    attributes: ['id'],
                    model: models.group,
                    where: {
                        id: {
                            [Op.in]: groupIds
                        }
                    },
                    required: true
                }
            ],
            raw: true
        }

        const users = await models.user.findAll(options);


        users.forEach(user => {

            if(type === 'text'){
                queues.textNotificationQueue.add({user, content, type});
            }else{
                queues.pushNotificationQueue.add({user, content, type});
            }

        });

    }
}
