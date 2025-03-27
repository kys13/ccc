const express = require('express');
const router = express.Router();
const { 
    getCampaigns,
    getCampaignById,
    applyCampaign,
    toggleBookmark
} = require('../controllers/campaigns');
const auth = require('../middlewares/auth');

// Public routes
router.get('/', getCampaigns);
router.get('/:id', getCampaignById);

// Protected routes
router.post('/:id/apply', auth, applyCampaign);
router.post('/:id/bookmark', auth, toggleBookmark);

module.exports = router; 