const {TypeSong} = require('../models/TypeSong');
const {TypeCountry} = require('../models/TypeCountry');
const {Song} = require('../models/Song');
const cron = require('node-cron');

function getSongName(unsignedname) {
    unsignedname = unsignedname.toLowerCase();

    unsignedname = unsignedname.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    unsignedname = unsignedname.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    unsignedname = unsignedname.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    unsignedname = unsignedname.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    unsignedname = unsignedname.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    unsignedname = unsignedname.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    unsignedname = unsignedname.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    unsignedname = unsignedname.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
    unsignedname = unsignedname.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return unsignedname;
}

function getTypeOfSong(typeid, res, callback){
    TypeSong.findOne({typeid}, (err, data) => {
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }
        callback(data.name);
    });

}

function getTypeCountryOfSong(typeid, res, callback){
    TypeCountry.findOne({typeid}, (err, data) => {
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }
        callback(data.name);
    });
}

function updateTimelistenOfSongs(hour, callback){
    Song.find({},(err, songs) => {
        if(err){
            console.log(err);
            return ;
        }
        songs.forEach(Element => {
            Element.listentimein24h.set(hour, Element.numlisten);
            Element.save().then(result => {
            
            })
            .catch(err=>{
                console.log(err);
            })
        });
        callback();
    });
}

var taskupdate = cron.schedule('0 * * * *',() =>{
    var nowtime = new Date();
    updateTimelistenOfSongs(nowtime.getHours(), () =>{
        console.log(nowtime.getHours()+':'+nowtime.getMinutes()+':'+nowtime.getSeconds());
    });

},{scheduled:false, timezone:'Asia/Bangkok'});

taskupdate.start();

module.exports = {getSongName, getTypeOfSong, getTypeCountryOfSong, updateTimelistenOfSongs}