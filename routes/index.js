const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const campaignRoutes = require('./campaigns');
const adminRoutes = require('./admin');
const userRoutes = require('./users');

router.use('/auth', authRoutes);
router.use('/campaigns', campaignRoutes);
router.use('/admin', adminRoutes);
router.use('/users', userRoutes);

module.exports = router; 