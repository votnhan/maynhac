import React from 'react';
import '../assets/css/UploadPage.css';

class UploadPage extends React.Component {

    render() {
        return (
        <form className="ui form" onSubmit={this.onFormSubmit} style={{width: "80%", marginLeft: "10%", marginRight: "10%"}}>
            <div className="field">
            <label>Name</label>
            <input onChange={this.onInputChanged} type="text" name="name" placeholder="Name"/>
            </div>

            <div className="field">
                <label>Artist</label>
                <input onChange={this.onInputChanged} type="text" name="artist" placeholder="Artist"/>
            </div>

            <div className="field">
                <select onChange={this.onInputChanged} className="ui dropdown" name="type">
                    <option value="">Type</option>
                    <option value="1">US-UK</option>
                    <option value="0">KPOP</option>
                    <option value="2">VPOP</option>
                </select>
            </div>

            <div className="field">
                <label>Lyric</label>
                <textarea onChange={this.onInputChanged} name="lyric"></textarea>
            </div>


            <div className="ui middle aligned center aligned grid container" style={{paddingTop: "20px"}}>
                <div className="ui fluid segment">
                    <input onChange={this.onFileSelected} type="file" accept="audio/*" name="file"  className="inputfile" id="embedpollfileinput" />

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

    onInputChanged = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onFileSelected = (e) => {
        this.setState({file: e.target.files});
        console.log(e.target.files[0]);
        console.log(e.target.files.length);
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);

    }
}

export default UploadPage;