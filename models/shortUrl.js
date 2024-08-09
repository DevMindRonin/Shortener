const mongoose = require("mongoose")
const shortId = require("shortid")

const shortUrlTable = new mongoose.Schema({
    
    // full url
    full: {
        type:String, 
        required: true
    },
    // short url
    short: {
        type:String, 
        required: true,
        default: shortId.generate
    },
    // no. clicks
    clicks: {
        type: Number, 
        require: true, 
        default: 0
    }
})

module.exports = mongoose.model("ShortUrl", shortUrlTable)