const { Thought } = require("../models");
const User = require(`../models/User`);

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that id" })
          : res.json(comment)
      )
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: newThoughtData._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "Thought created, but no users with this ID." })
          : res.json({ message: "Thought created!" })
      )
      .catch((err) => {
        console.error(err);
      });
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { thoughtText: req.body.thoughtText },
      { new: true }
    )
      .then((newThought) => res.status(200).json(newThought))
      .catch((err) => res.status(500).json(err));
  },

  deleteThought(req, res) {
    Thought.findOneanddelete({ _id: req.params.thoughtId })
      .then((deletedThought) => res.status(200).json(deletedThought))
      .catch((err) => res.status(500).json(err));
  },
  
  createReaction(req, res) {
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true }
    )
      .then((newReaction) => res.status(200).json(newReaction))
      .catch((err) => res.status(500).json(err));
  },

  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((response) => res.status(200).json(response))
      .catch((err) => res.status(500).json(err));
  },
};
