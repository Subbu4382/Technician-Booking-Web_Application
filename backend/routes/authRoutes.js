const express = require("express");
const router = express.Router();

const {
  register,
  login
} = require("../controllers/authController");

// Register User / Technician
router.post("/register", register);

// Login User / Technician
router.post("/login", login);

module.exports = router;
