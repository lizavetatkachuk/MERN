const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const DataSchema= new Schema(
    {
        id: Number,
        message: String

    },
    { timestamps : false}
)

const Data = mongoose.model("Data", DataSchema);

module.exports = {Data};
