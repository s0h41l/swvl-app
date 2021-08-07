const {
    sendIndividualTextNotification,
    sendIndividualPushNotification,
    sendGroupTextNotification,
    sendGroupPushNotification
} = require('../queues/notification');

module.exports = {
    sendIndividualNotification: async (req, res, next) => {
        
        try {

            const { type, ids, content } = req.body;

            if(type == 'text'){
                sendIndividualTextNotification(ids, content);
            }else{
                sendIndividualPushNotification(ids, content);
            }

            res.json({
                message: 'Notification sending process initiated!'
            });
            
        } catch (error) {
            next(error)
        }
    },
    sendGroupNotification: async (req, res, next) => {
        try {

            const { type, ids, content } = req.body;

            if(type == 'text'){
                sendGroupTextNotification(ids, content)
            }else{
                sendGroupPushNotification(ids, content);
            }

            res.json({
                message: 'Notification sending process initiated!'
            });
            
        } catch (error) {
            next(error)
        }
    }
}