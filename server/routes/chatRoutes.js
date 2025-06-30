const express = require("express");
const userController = require("./../controllers/userController");
const chatController = require("./../controllers/chatController");

const router = express.Router();

router.route("/rename").put(userController.protect, chatController.renameGroup);
router.route("/").post(userController.protect, chatController.accessChat);
router.route("/").get(userController.protect, chatController.fetchChat);
router
  .route("/group")
  .post(userController.protect, chatController.createGroupChat);
router
  .route("/groupremove")
  .put(userController.protect, chatController.removeFromGroup);
router
  .route("/groupadd")
  .put(userController.protect, chatController.addToGroup);

module.exports = router;
