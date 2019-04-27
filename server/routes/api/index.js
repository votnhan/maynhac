const express = require('express');
const router = express.Router();

router.use('/user', require('./UserAPI'));

module.exports = router;