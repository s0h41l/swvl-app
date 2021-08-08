const { Router } = require('express');
const { sendIndividualNotification, sendGroupNotification } = require('../controllers/notification');
const notificationValidator = require('../validators/notification');
const validate = require('../validators/validate');


const router = Router();

// Route to send individual notification
router.put(
    '/individual',
    notificationValidator.sendIndividualNotification(),
    validate,
    sendIndividualNotification
    );

// Route to send group notification
router.put(
    '/group',
    notificationValidator.sendGroupNotification(),
    validate,
    sendGroupNotification
    )

module.exports = router;