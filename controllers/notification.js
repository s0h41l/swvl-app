const { sendGroupNotification, sendIndividualNotification } = require('../queues/notification');

module.exports = {
    sendIndividualNotification: async (req, res, next) => {
        
        try {

            const { type, ids, content } = req.body;

            sendIndividualNotification(ids, content, type);

            res.json({
                message: 'Notification sending process initiated'
            });
            
        } catch (error) {
            next(error)
        }
    },
    sendGroupNotification: async (req, res, next) => {
        try {

            const { type, ids, content } = req.body;

            sendGroupNotification(ids, content, type);

            res.json({
                message: 'Notification sending process initiated'
            });
            
        } catch (error) {
            next(error)
        }
    }
}