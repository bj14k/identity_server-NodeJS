const express = require('express');
const router = express.Router();
const jwtHelper = require('../config/jwtHelper');

var ctrlUser = require('../controllers/user.controller');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/getUserProfile', jwtHelper.validateToken, ctrlUser.userProfile);

module.exports = router;