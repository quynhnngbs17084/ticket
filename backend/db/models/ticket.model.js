const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    name: {
      type: String,
      require: true,
    },
    _routeId: { type: mongoose.Types.ObjectId },
    _stationId: { type: mongoose.Types.ObjectId },
    _metroId: { type: mongoose.Types.ObjectId },
})

const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = { Ticket }
