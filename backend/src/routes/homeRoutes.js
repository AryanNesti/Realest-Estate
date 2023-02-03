const express = require('express')
const router = express.Router()
const {
  getHomes,
  addHome,
  deleteHome,
} = require('../controllers/homeController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getHomes).post(protect, addHome)
router.route('/').delete(protect, deleteHome)

module.exports = router