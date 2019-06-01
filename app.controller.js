const Event = require('./app.model.js');

//Create new Event
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Event content can not be empty"
        });
    }

    //Create an Event
    const event = new Event({
       
        title: req.body.title , 
        image_url: req.body.image_url,
        event_start: req.body.event_start,
        event_end: req.body.event_end,
            venue: {
            name: req.body.venue.name,
            address: req.body.venue.address,
            city: req.body.venue.city,
            postalCode: req.body.venue.postalCode,
            region: req.body.venue.region,
            country: req.body.venue.country,
            lat: req.body.venue.lat,
            lon: req.body.venue.lon,
        
            },
            description: req.body.description,
    });


    // Save Event in the database
    event.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the event."
        });
    });
};

//Retrieve all events from the database.
// exports.findAll = (req, res) => {
//     Event.find()
//     .then(events => {
//         res.send(events);
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Something wrong while retrieving events."
//         });
//     });
// };

//retrieve all events with pagination
//can be tested on postman with [http://localhost:3000/Events?pageNo=1&size=5]
exports.findAll = (req, res) => {
    var pageNo = parseInt(req.query.pageNo);
    var size = parseInt(req.query.size);
    var query = {}
        if(pageNo < 0 || pageNo === 0) {
                response = {"error" : true,"message" : "invalid page number, should start with 1"};
                return res.json(response)
        }
    query.skip = size * (pageNo - 1)
    query.limit = size


    Event.find({},{},query)
    .then(events => {
        res.send(events);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving events."
        });
    });
};


// Find a single event with a eventId
exports.findOne = (req, res) => {
    Event.findById(req.params.eventId)
    .then(event => {
        if(!event) {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });            
        }
        res.send(event);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving event with id " + req.params.eventId
        });
    });
};

// Update a event
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Event content can not be empty"
        });
    }

    // Find and update event with the request body
    Event.findByIdAndUpdate(req.params.eventId, {
        title: req.body.title , 
        image_url: req.body.image_url,
        event_start: req.body.event_start,
        event_end: req.body.event_end,
            venue: {
            name: req.body.venue.name,
            address: req.body.venue.address,
            city: req.body.venue.city,
            postalCode: req.body.venue.postalCode,
            region: req.body.venue.region,
            country: req.body.venue.country,
            lat: req.body.venue.lat,
            lon: req.body.venue.lon,
        
            },
            description: req.body.description,
    }, {new: true})
    .then(event => {
        if(!event) {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });
        }
        res.send(event);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.eventId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Event.findByIdAndRemove(req.params.eventId)
    .then(event => {
        if(!event) {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });
        }
        res.send({message: "Event deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });                
        }
        return res.status(500).send({
            message: "Could not delete event with id " + req.params.eventId
        });
    });
};