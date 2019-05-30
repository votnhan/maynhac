require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const {User} = require('../../models/User');
const {TypeReport} = require('../../models/TypeReport');

const utilUser = require('../../util/ForUser');
const utilSong = require('../../util/ForSong');

const verifyToken = require('../../middlewares/verifyToken');
const {uploadFileGoogleDrive} = require('../../middlewares/uploadFile');
const router = express.Router();

router.get('/typeReport', (req, res, next) => {
    TypeReport.find().then(
        data => {
        res.status(200).send(data)
    })
    .catch(err => {
        console.log(err);
        res.status(500).send(err)
    });
});

router.post('/report', (req, res, next) => {
    TypeReport.find().then(
        data => {
        res.status(200).send(data)
    })
    .catch(err => {
        console.log(err);
        res.status(500).send(err)
    });
});

router.get('/report', , ())

module.exports = router;