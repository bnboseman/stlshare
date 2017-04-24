const express = require('express');
const router = express.Router();
const users = require('../users/routes');
const stl = require('../stl/routes');

router.use('/user', users);
router.use('/stl', stl);
module.exports  = router;
