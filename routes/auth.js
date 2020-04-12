const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const authController = require('../controllers/authController');

router.post('/', 
    authController.authUser 
)
router.get('/', 
    auth,
    authController.getAuthUser
)
module.exports = router;