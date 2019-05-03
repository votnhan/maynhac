const express = require('express');
const router = express.Router();

router.use('/user', require('./UserAPI'));
router.use('/playlist', require('./PlaylistAPI'));
router.use('/song', require('./SongAPI'));

module.exports = router;