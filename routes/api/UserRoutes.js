const router = require("express").Router();

const {
  getUser,
  createUser,
  getOneUser,
  updateOneUser,
  addFriend,
  deleteFriend,
  deleteOneUser,
} = require("../../controllers/userController");

router.route("/").get(getUser).post(createUser);

router
  .route("/:userId")
  .get(getOneUser)
  .put(updateOneUser)
  .delete(deleteOneUser);

router.route("/:userId/friends/:friendId").post(addFriend).put(deleteFriend);

module.exports = router;
