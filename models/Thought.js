const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require('moment');

// Schema to create User model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Use a getter method to format the timestamp on query
            get: formatDate => moment(formatDate).format('MMMM Do YYYY')
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);


// Create a virtual called reactionCount that retrieves the length 
// of the thought's reactions array field on query
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });


const Thought = model('Thought', thoughtSchema);

module.exports = Thought;