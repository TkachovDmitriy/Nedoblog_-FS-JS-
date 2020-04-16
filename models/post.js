const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const postSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imgURL: {
        type: String,
    },
    author: {
        type: Schema.Types.ObjectId ,
        ref: 'User' 
    },
    comments: [
        {
         type: Schema.Types.ObjectId ,
         ref: 'Comment' 
        }],
   date: {
       type: Date,
       required: true
   } 
})

module.exports = mongoose.model('Post', postSchema)