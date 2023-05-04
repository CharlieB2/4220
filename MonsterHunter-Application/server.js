const express = require('express');

const app = express();
const port = 8888;

const mongo = require('./db');

// exported router
const search = require('./routes/search.js');

// app use
app.use('/search', search);

app.listen(port, async () => {
    console.log(`Server is listening on port ${port}`);
    await mongo.connect();
});
