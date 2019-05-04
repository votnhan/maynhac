const multer = require('multer');
const crypto = require('crypto');

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

module.exports = {uploadFile};