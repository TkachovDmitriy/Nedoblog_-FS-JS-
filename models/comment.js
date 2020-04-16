const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId ,
        ref: 'User' 
    },
    postId: {
        type: Schema.Types.ObjectId ,
        ref: 'Post' 
    },
   date: {
       type: Date,
       required: true
   } 
})

module.exports = mongoose.model('Comment', commentSchema)