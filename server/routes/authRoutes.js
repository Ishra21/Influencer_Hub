const express = require('express')
const { registerUser, loginUser, privatController } = require('../controllers/authControllers')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

router.post("/register", registerUser)

router.post("/login", loginUser)

router.post("/private",protect, privatController)


module.exports = router