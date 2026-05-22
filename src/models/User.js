const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

});



const model = mongoose.model("User", userSchema)

module.exports = model