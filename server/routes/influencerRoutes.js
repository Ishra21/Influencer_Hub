const express = require('express')
const { getInfluencers, getInfluencer, searchInfluencer } = require('../controllers/influencerController')

const router = express.Router()

router.get("/", getInfluencers)

router.get("/single/:id", getInfluencer)

router.get("/search", searchInfluencer)


module.exports = router
