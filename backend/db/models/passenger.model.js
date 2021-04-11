const mongoose = require('mongoose');

const PassengerSchema = new mongoose.Schema({
    name: {
      type: String,
      require: true,
      minlength: 1,
      trim: true,
    }
})

const Passenger = mongoose.model('Passenger', PassengerSchema);

module.exports = { Passenger }
