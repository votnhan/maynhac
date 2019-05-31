const express = require('express');
const router = express.Router();

router.use('/user', require('./UserAPI'));
router.use('/playlist', require('./PlaylistAPI'));
router.use('/song', require('./SongAPI'));
router.use('/album', require('./AlbumAPI'));
router.use('/homepage', require('./HomePageAPI'));
router.use('/history', require('./HistoryAPI'));
router.use('/report', require('./ReportAPI'));

module.exports = router;