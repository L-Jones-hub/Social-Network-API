const router = require("express").Router();
const userRoutes = require("./UserRoutes");
const thoughtRoutes = require("./ThoughtRoutes");
const reactionRoutes = require("./ReactionRoutes");

router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);
router.use("/reactions", reactionRoutes);

module.exports = router;
