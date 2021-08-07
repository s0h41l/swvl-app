const { Router } = require('express');
const { sendIndividualNotification, sendGroupNotification } = require('../controllers/notification');

const router = Router();

// Route to send individual notification
router.put('/individual', sendIndividualNotification);

// Route to send group notification
router.put('/group', sendGroupNotification)

module.exports = router;