const express = require('express')
const { createInfluencer, updateInfluencer, removeInfluencer, getAllBookings, updateBooking, getAllUser, getAllComments } = require('../controllers/adminController')
const adminprotect = require('../middleware/adminMiddleware')

const router = express.Router()

router.post('/influencer',adminprotect, createInfluencer)
router.put('/influencer/:id',adminprotect, updateInfluencer)
router.delete('/influencer/:id',adminprotect, removeInfluencer)
router.get('/bookings/',adminprotect, getAllBookings)
router.put('/bookings/:id', adminprotect, updateBooking)
router.get("/users", adminprotect, getAllUser)
router.get("/comments", adminprotect, getAllComments)


module.exports = router