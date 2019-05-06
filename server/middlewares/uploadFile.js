const multer = require('multer');
const crypto = require('crypto');
const uuid = require('uuid');
const AWS = require('aws-sdk');
const {AWS_ACCESS_KEY, AWS_BUTKET, AWS_SECRET_ACCESS_KEY} = require('./constant');

const uploadFile =  multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            if(file.fieldname == 'song'){
                cb(null, 'public/music/');
            }
            else if(file.fieldname == 'avatar'){
                cb(null, 'public/avatar_music/');
            }
        },
        filename: function (req, file, cb) {
            console.log(req.files);

            const address = req.headers['x-forwarded-for'] || req.connection.remoteAddress
            const port = req.headers['x-forwarded-port'] || req.connection.remotePort;
            const matches = /(.*)[.](.*)$/.exec(file.originalname);
            const extension = matches && matches[2];
            const hashedFileName = crypto.createHash('sha1').update(`${file.originalname}-${(new Date().getTime().toString())}-${address}-${port}`).digest('hex');
            
            if(file.fieldname == 'song'){
                req.hashedFileMusic = hashedFileName+'.'+extension;
            }
            else if(file.fieldname == 'avatar'){
                req.hashedFileAvatar = hashedFileName+'.'+extension;
            }
            
            if (extension) cb(null, `${hashedFileName}.${extension}`);
            else cb(null, `${hashedFileName}`);
        }
    })
})

function uploadSongAWS(req, res, next) {
    const {song, avatar } = req.files;
    
    var extension = getFileExtensions(song.name)
    const keySong = uuid.v4() + '.'+ extension;
    const filesong = {Bucket: AWS_BUTKET, Key: keySong, Body: song.data};

    extension = getFileExtensions(avatar.name);
    const keyAvatar = uuid.v4() + '.'+ extension;
    const fileavatar = {Bucket: AWS_BUTKET, Key: keyAvatar, Body: avatar.data};

    uploadFileAWS(filesong, (urlSong) => {
        req.urlSong = urlSong;
        uploadFileAWS(fileavatar, (urlAvatar) => {
            req.urlAvatar = urlAvatar;
            next();
        });
    });
}

function getFileExtensions(name){
    var splitname = name.split('.');
    var extension = splitname[splitname.length - 1]
    return extension
}

function uploadFileAWS(fileinfors, cb){
    const uploadPromise = getUpdatePromise(fileinfors);
    uploadPromise.then( data =>{
        const getLinkAWSPromise = getObjAWSS3();
        const infortoget = {Bucket: AWS_BUTKET, Key: fileinfors.Key};
        const url = getLinkAWSPromise.getSignedUrl('getObject', infortoget);
        cb(url);
    })
    .catch( err =>{
        console.log(err);
    })
}

function getObjAWSS3(){
    return new AWS.S3({apiVersion: '2006-03-01', accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_ACCESS_KEY})
}

function getUpdatePromise(fileinfors){
    return new AWS.S3({apiVersion: '2006-03-01', accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_ACCESS_KEY}).putObject(fileinfors).promise();
}

module.exports = {uploadSongAWS};