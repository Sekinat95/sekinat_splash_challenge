module.exports = (app) => {
    const events = require('./app.controller.js');

    // Create a new event
    app.post('/Event', events.create);

    // Retrieve all events
    app.get('/Events', events.findAll);

    // Retrieve a single event with eventId
    app.get('/Event/:eventId', events.findOne);

    // Update a Note with eventId
    app.put('/Event/:eventId', events.update);

    // Delete a Note with eventId
    app.delete('/Event/:eventId', events.delete);
}