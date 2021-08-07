const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');

const notificationRoutes = require('./routes/notification');

app.use(bodyParser.json());
cors();

app.use('/notification', notificationRoutes);

const PORT = process.env.NODE_SERVER_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
