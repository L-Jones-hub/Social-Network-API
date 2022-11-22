const { User, Thought } = require("../models");

module.exports = {
  getUser(req, res) {
    User.find()
      .then((users) => res.status(200).json(users))
      .catch((err) => res.status(500).json(err));
  },

  createUser(req, res) {
    User.create(req.body)
      .then((newUserData) => res.status(200).json(newUserData))
      .catch((err) => res.status(500).json(err));
  },

  getOneUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((userData) => res.status(200).json(userData))
      .catch((err) => res.json(err));
  },

  updateOneUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { username: req.body.username, email: req.body.email },
      { new: true }
    )
      .then((newUser) => res.status(200).json(newUser))
      .catch((err) => res.status(500).json(err));
  },

  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      { new: true }
    )
      .then((newFriend) => res.status(200).json(newFriend))
      .catch((err) => res.status(500).json(err));
  },

  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((oldFriend) => res.status(200).json(oldFriend))
      .catch((err) => res.status(500).json(err));
  },

  deleteOneUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "There is no user with that ID." })
          : Thought.deleteMany({ username: { $in: user.username } })
      )
      .then((confirm) => res.status(200).json(confirm))
      .catch((err) => res.status(500).json(err));
  },
};
