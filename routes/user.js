const express = require('express');
const userController = require("../controllers/user");
const { verify, verifyAdmin, isLoggedIn } = require("../auth");
const passport = require("passport");


// Routing component
const router = express.Router();

//Routes will be placed below



// Route for user registration
router.post("/register", userController.registerUser);

// Route for user login
router.post("/login", userController.loginUser);

// Route for retreiving user details
router.get("/details", verify, userController.retrieveUserDetails);


// Route for updating password
router.patch("/update-password", verify, userController.updatePassword);

module.exports = router;