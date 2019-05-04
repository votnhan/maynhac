import React from 'react';
import '../assets/css/UploadPage.css';

class UploadPage extends React.Component {

    render() {
        return (
        <form className="ui form" style={{width: "80%", marginLeft: "10%", marginRight: "10%"}}>
            <div className="field">
            <label>Name</label>
            <input type="text" name="name" placeholder="Name"/>
            </div>

            <div className="field">
                <label>Artist</label>
                <input type="text" name="artist" placeholder="Artist"/>
            </div>

            <div className="field">
                <select className="ui dropdown" name="type">
                    <option value="">Type</option>
                    <option value="1">US-UK</option>
                    <option value="0">KPOP</option>
                    <option value="2">VPOP</option>
                </select>
            </div>

            <div className="field">
                <label>Lyric</label>
                <textarea name="lyric"></textarea>
            </div>


            <div className="ui middle aligned center aligned grid container" style={{paddingTop: "20px"}}>
                <div className="ui fluid segment">
                    <input type="file" accept="audio/*"  className="inputfile" id="embedpollfileinput" />

                    <label htmlFor="embedpollfileinput" className="ui huge red right floated button">
                        <i className="ui upload icon"></i> 
                        Upload file
                    </label>
                </div>
            </div>
            <div className="field" style={{alignContent: "center", textAlign: "center", paddingTop: "30px"}}>
                <button className="ui button" type="submit">Submit</button>
            </div>
            
        </form>
            );
    }
}

export default UploadPage;