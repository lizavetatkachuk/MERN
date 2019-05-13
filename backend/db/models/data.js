const mongoose= require('mongoose');
const { Schema } = mongoose;
const LocationSchema= new mongoose.Schema(
    {
        name : String,
        address: String

    },
    { timestamps : false}
)

const Location = mongoose.model("Location", LocationSchema);

module.exports = {Location};
