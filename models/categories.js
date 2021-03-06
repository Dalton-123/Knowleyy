const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
},{timestamps:true})

mongoose.model("Category",categorySchema)