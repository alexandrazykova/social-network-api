const { User } = require('../models');

module.exports = {
  // Get all users
  async getAllUsers(req, res) {
    try {
      const user = await User.find();

      res.json(user);

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Get single user by id
  async getUserById(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id })
        .select('-__v')
        .populate('thoughts')
        .populate('friends')

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      } else {
        res.json(user);
      }

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id' });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.deleteOne({ _id: req.params.id });

      if (!user) {
        res.status(404).json({ message: 'No user found with this id' });
      }

      res.json({ message: 'User successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Add a friend
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with this id' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove a friend from user
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: { friendsId: req.params.friendId } } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with this id' });
      }

      res.json({ message: 'Friend successfully deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
