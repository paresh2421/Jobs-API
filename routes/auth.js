const express = require('express');
const router = express.Router();

const {register, login} = require('../controllers/auth');

router.post('/register', register); // easier way to write router.route('/register').post(register)
router.post('/login', login);

module.exports = router;
