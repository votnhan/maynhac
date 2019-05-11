const multer = require('multer');
const crypto = require('crypto');
const uuid = require('uuid');
const AWS = require('aws-sdk');
const fs = require('fs');
const {google} = require('googleapis');
const Duplex = require('stream').Duplex;

const {AWS_ACCESS_KEY, AWS_BUCKET, AWS_SECRET_ACCESS_KEY, TOKEN_PATH, CREDENTIALS_PATH, DRIVE_ID_FOLDER, LINK_MUSIC_STUCTURE} = require('./constant');

// Using Multer (static file server)
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

// Using AWS S3 (blocked Account)
function uploadSongAWS(req, res, next) {
    const {song, avatar } = req.files;
    
    var extension = getFileExtensions(song.name)
    const keySong = uuid.v4() + '.'+ extension;
    const filesong = {Bucket: AWS_BUCKET, Key: keySong, Body: song.data, ACL:'public-read'};

    extension = getFileExtensions(avatar.name);
    const keyAvatar = uuid.v4() + '.'+ extension;
    const fileavatar = {Bucket: AWS_BUCKET, Key: keyAvatar, Body: avatar.data, ACL:'public-read'};

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
        cb(data.Location);
    })
    .catch( err =>{
        console.log(err);
    })
}

function getObjAWSS3(){
    return new AWS.S3({apiVersion: '2006-03-01', accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_ACCESS_KEY})
}

function getUpdatePromise(fileinfors){
    return new AWS.S3({apiVersion: '2006-03-01', accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_ACCESS_KEY}).upload(fileinfors).promise();
}


// Using Google Drive (Work now !)

function uploadFileGoogleDrive(req, res, next){
    fs.readFile(CREDENTIALS_PATH, (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        req.credentials = JSON.parse(content);
        authorize(req, uploadFileHandler, next);
    });
}

function authorize(req, handler, next) {
    const {client_secret, client_id, redirect_uris} = req.credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, handler);
        
        oAuth2Client.setCredentials(JSON.parse(token));
        req.auth = oAuth2Client;
        handler(req, next);
    });
}

function uploadFileHandler(req, next){
    const {song, avatar } = req.files;
    
    var fileMetaData = {name:song.name, parents:[DRIVE_ID_FOLDER]}
    
    var media = {mimeType: 'audio/mpeg', body: bufferToStream(song.data)}
    var drive = google.drive('v3');

    drive.files.create({auth: req.auth, media, resource: fileMetaData}, (err, result) => {
        if(err){
            console.log(err);
        }
        req.urlSong = LINK_MUSIC_STUCTURE + result.data.id;

        fileMetaData = {name: avatar.name, parents: [DRIVE_ID_FOLDER] };
        var typeImage = (getFileExtensions(avatar.name) == 'png')?'image/png':'image/jpeg' ;
        media = {mimeType: typeImage, body: bufferToStream(avatar.data)};
        drive.files.create({auth: req.auth, media, resource: fileMetaData}, (err, result) => {
            if(err){
                console.log(err);
            }
            req.urlAvatar = LINK_MUSIC_STUCTURE + result.data.id;
            next();
        });
    });
}

function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log('Token stored to', TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
    });
}

function bufferToStream(buffer){
    var stream = new Duplex();
    stream.push(buffer);
    stream.push(null);
    return stream;

}


module.exports = {uploadFileGoogleDrive};