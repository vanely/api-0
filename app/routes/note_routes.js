// used to access mongodb's ObjectID type
const ObjectID = require('mongodb').ObjectID;

module.exports = (app, db) => {

    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                console.log(err);
            } else {
                res.send(item);
            }
        })
    });

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};

        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                console.log(err);
            } else {
                res.send(item);
            }
        })
    });

    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        const note = {text: req.body.body, title: req.body.title};

        db.collection('notes').update(details, note, (err, item) => {
            if (err) {
                console.log(err);
            } else {
                res.send(item);
            }
        })
    });

    app.post('/notes', (req, res) => {
        const note = {text: req.body.body, title: req.body.title};

        // console.log(req.body);
        db.collection('notes').insertOne(note, (err, result) => {
            if (err) {
                res.send({err: 'An error has occured'});
            } else {
                // console.log(result);
                // result is an object with ops property inside, containing request body
                res.send(result.ops[0]);
            }
        });
    });
};