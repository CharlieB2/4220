const express = require('express');

const app = express();
const port = 8888;

//const mongo = require('./db');

// exported routers
const monsters = require('./routes/monsters.js');
const weapons = require('./routes/weapons.js');
const armors = require('./routes/armors.js');

// app use
app.use('/monsters', monsters);
app.use('/weapons', weapons);
app.use('/armors', armors);

app.listen(port, async () => {
    console.log(`Server is listening on port ${port}`);
});
