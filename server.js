const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();
const port = process.env.PORT || 3333;

app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect(db.url, {"useNewUrlParser": true, "useUnifiedTopology": true}, (err, client) => {
    if (err) {
        console.log(err);
    }
    // point to db
    const db = client.db('api-0');
    console.log('Connected to DB');
    const routes = require('./app/routes/index');
    routes(app, db);

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });

    client.close();
});

