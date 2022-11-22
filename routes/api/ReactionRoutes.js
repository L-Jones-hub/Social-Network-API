const router = require("express").Router();

const {
  getReactions,
  getSingleReaction,
  createReaction,
  deleteReaction,
} = require("../../controllers/reactionController");

router.route("/").get(getReactions);

router.route("/:thoughtId/reactions").post(createReaction);

router
  .route("/:thoughtId/reactions/:reactionId")
  .get(getSingleReaction)
  .delete(deleteReaction);

module.exports = router;
