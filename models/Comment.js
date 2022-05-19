const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema(
    { // Set custom id to avoid confusion with parent comment _id
        replyId: {
            type: Schema.Types.ObjectId()
        },
        replyBody: {
            type: String 
        },
        writtenBy: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const CommentSchema = new Schema({
    writtenBy: {
        type: String
    },
    commentBody: {
        type: String
        },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    //use ReplyScema to validate date for a reply
    replies: [ReplySchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

// create the Pizza model using the PizzaSchema
const Comment = model('Comment', CommentSchema);

// export the Pizza model
module.exports = Comment;