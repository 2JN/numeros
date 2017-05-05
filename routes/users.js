var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');

/* GET users listing. */
router.get('/login', user_controller.user_login_get);

var {authenticate, callback} = user_controller.user_login_post;
router.post('/login', authenticate, callback);

router.get('/logout', user_controller.user_logout_get);

router.get('/register', user_controller.user_register_get);

router.post('/register', user_controller.user_register_post);

module.exports = router;
