const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');

const notificationRoutes = require('./routes/notification');

cors();

app.use(bodyParser.json());

app.use('/notification', notificationRoutes);

// Error handler
app.use(function (err, req, res, next) {
    const code = err.statusCode || 500;
    const message = err.message;
    res.status(code).send(message);
  });

const PORT = process.env.NODE_SERVER_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
