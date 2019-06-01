const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    
    title: String,
    image_url: String,
    event_start: Number,
    event_end: Number,
    venue: {
        name: String,
        address: String,
        city: String,
        postalCode: Number,
        region: String,
        country: String,
        lat: Number,
        lon: Number,
    }, 
    description: String,
});


module.exports = mongoose.model('Events', EventSchema);

