const mongoose = require('mongoose');

const StationSchema = new mongoose.Schema({
    name: {
      type: String,
      require: true
    }
})

const Station = mongoose.model('Station', StationSchema);

module.exports = { Station }
