const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    title: {
        type: String
    }
})

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = { Admin } 
