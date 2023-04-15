const mongoose = require('mongoose')

const TODO = mongoose.Schema({
    work : String,
})

module.exports = mongoose.model("Todo",TODO)