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

router.post('/typeFromId', (req, res, next) => {
    var typeid = req.body.reasonId;
    TypeReport.findOne({typeid}, (err, type, next) => {
        console.log(type);
            res.status(200).send(type);
    })
})

router.post('/reportById', (req, res) => {
    var _id = req.body.reportId;
    Report.findOne({_id}, (err, report) => {
        if (err) {
            res.status(402).send(false);
        }
        else {
            console.log(report);
            res.status(200).send(report);
        }
        
    })
})


router.post('/report', verifyToken,  (req, res, next) => {
    const {reasonId, songId, description, username} = req.body;
    const report = new Report({reasonId, songId, description});
    User.findOne({username}, (err, user) => {
        for (var i = 0 ; i < user.report.length; ++i) {
            if (user.report[i].song == songId) {
                console.log(user.report[i].songId)
                res.status(402).send(false);
                return;
            }
        }

        report.save().then(
            report => {
                const idreport = report._id;
                User.update({username}, {$push: {report: {reportId: idreport, song: songId}}}).then(
                    data =>  {
                        res.status(200).send(report);
                        return;
                    }
                )
                .catch(err => {
                    console.log(err);
                    res.status(500).send(err);
                    return;

                })
            }
        )
        .catch(err => {
            console.log(err);
            return;
        })

        
    }).catch(err => {
        console.log(err);
        res.status(500).send(err);
    });

    
});


module.exports = router;