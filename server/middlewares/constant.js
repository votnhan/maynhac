// For AWS S3
const AWS_ACCESS_KEY = process.env.ACCESS_KEY_ID;
const AWS_BUCKET = 'maynhac-de034739-e333-4019-a8fe-98be19dc6ca6';
const AWS_SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

// For Google Drive
const DRIVE_ID_FOLDER = process.env.ID_FOLDER_DRIVE;
const TOKEN_PATH = './middlewares/token.json';
const CREDENTIALS_PATH = './middlewares/credentials.json';
const LINK_MUSIC_STUCTURE = 'https://docs.google.com/uc?export=download&id=';

module.exports = {AWS_ACCESS_KEY, AWS_BUCKET, AWS_SECRET_ACCESS_KEY, DRIVE_ID_FOLDER, TOKEN_PATH, CREDENTIALS_PATH, LINK_MUSIC_STUCTURE};
