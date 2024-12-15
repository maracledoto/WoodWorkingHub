const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');


router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_signin);

router.delete("/:userId", checkAuth, UserController.user_delete);

router.patch("/profile", checkAuth, UserController.user_update_profile);
router.get("/profile", checkAuth, UserController.get_user_info);


module.exports = router;