const notesRoutes = require('./note_routes');

module.exports = (app, db) => {
    notesRoutes(app, db);
};