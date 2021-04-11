const mongoose = require('mongoose');

const MetroSchema = new mongoose.Schema({
    name: {
      type: String,
      require: true
    }
})

const Metro = mongoose.model('Metro', MetroSchema);

module.exports = { Metro }
