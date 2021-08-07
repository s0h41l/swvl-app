const app = require('express')();


const PORT = process.env.NODE_SERVER_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
