const { Thought, Reaction } = require("../models");

module.exports = {
  getReactions(req, res) {
    Reaction.find()
      .then((reaction) => res.json(reaction))
      .catch((err) => res.status(500).json(err));
  },

  getSingleReaction(req, res) {
    Reaction.findOne({ _id: req.params.reactionId })
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: `No reaction found with that id.` })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },

  createReaction(req, res) {
    Reaction.create(req.body)
      .then((reaction) => {
        return Thought.findOneAndUpdate(
          { _id: req.body.postId },
          { $push: { comments: reaction._id } },
          { new: true }
        );
      })
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "Reaction created, but no posts with this ID." })
          : res.json({ message: "Reaction created!" })
      )
      .catch((err) => {
        console.error(err);
      });
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
