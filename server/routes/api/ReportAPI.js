require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const {User} = require('../../models/User');
const {TypeReport} = require('../../models/TypeReport');
const {Report} = require('../../models/Report');

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

router.post('/report', verifyToken,  (req, res, next) => {
    const {reasonId, songId, description, username} = req.body;
    const report = new Report({reasonId, songId, description});
    report.save().then(
        report => {
            const idreport = report._id;
            User.update({username}, {$push: {report: idreport}}).then(
                data =>  {
                    res.status(200).send(report);
                }
            )
            .catch(err => {
                console.log(err);
                res.status(500).send(err)
            })
        }
    )
    .catch(err => console.log(err))
});


module.exports = router;