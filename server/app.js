require('dotenv').config();

const express = require('express');
const http = require('http');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const fileUpload = require('express-fileupload');

const routes = require('./routes');
const config = require('./config');

console.log(process.env.AWS_ACCESS_KEY);

const app = express();
app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }
}));

app.use(express.static(path.join(__dirname, './public')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/index.html'));

});

app.use('/', routes);

mongoose.connect(config.uriMongo).then(
    () => { console.log('Database is connected !'); },
    (err) => { console.log('Database is not connected !')}
);

const port = process.env.port || '5000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
    console.log('Running on localhost:'+port);
});
