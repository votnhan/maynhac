const fs = require('fs');
const AWS = require('aws-sdk');
const uuid = require('uuid');
const {AWS_ACCESS_KEY, AWS_BUCKET, AWS_SECRET_ACCESS_KEY} = require('../middlewares/constant');


console.log(AWS_ACCESS_KEY);
const filelink = 'E:/hinhhoc/anhnhaodauthe.jpg';
const file = fs.readFileSync(filelink);
const params = {Bucket: AWS_BUCKET, Key: uuid.v4()+'.jpg', Body: file, ACL:'public-read'}


var uploadPromise = new AWS.S3({apiVersion: '2006-03-01', accessKeyId:AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_ACCESS_KEY}).upload(params).promise();
uploadPromise.then(
  function(data) {
    console.log("Successfully uploaded data to " + AWS_BUCKET + "/" + 'ahihi.txt');
    console.log(data);
  })
    .catch(
    function(err) {
      console.error(err, err.stack);
});



