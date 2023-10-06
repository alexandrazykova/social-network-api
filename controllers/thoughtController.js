const { Thought, User } = require('../models');
//const { ObjectId } = require('mongoose')

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thought = await Thought.find();
            console.log(thought);
            res.status(200).json(thought)
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Get thought by id
    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findById({ _id: req.params.id })

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body)

            const user = await User.findOneAndUpdate(
                { _id: req.body.id },
                { $addToSet: { thoughts: thought } },
                { new: true }
            )

            res.json(user);

        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.id });

            const UserThought = await User.findOneAndUpdate(
                { thoughts: req.params.id },
                { $pull: { thoughts: req.params.id } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found' });
            }
            res.json({ message: 'Thought successfully deleted' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Add a reaction to a thought
    async addReaction(req, res) {
        console.log('You are adding a reaction');
        console.log(req.body);

        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );


            if (!thought) {
                return res.status(404).json({ message: 'No thought found' });
            }

            res.json(thought);

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Remove a reaction from a tought
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { _id: req.params.reactionId } } },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found' });
            }

            res.json({ message: 'Reaction successfully deleted' });

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};