import React, {Component} from 'react';
import Modal from 'react-modal';
import { Tree } from 'antd';
import TextareaAutosize from "react-textarea-autosize";
import ReportService from '../../services/ReportService';
import { connect } from "react-redux";
import { message } from 'antd';

 
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      'z-index': 100
    }
  };
   

class ReportModal extends Component {

    constructor(props) {
        super(props);
        this.state = {isOpen: this.props.isOpen, selection: "", visibility: "hidden", loadType: false, description: "", otherId: 0};
    } 

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.isOpen !== prevState.isOpen) {
          return ({isOpen: nextProps.isOpen});
        }
        else {
          return null;
        }
      }

    componentDidMount() {
      if (this.state.loadType !== true) {
        this.loadType();
      }
    }

    componentDidUpdate() {
      if (this.state.loadType !== true) {
        this.loadType();
      }
    }

    loadType = () => {

      ReportService.handleGetType((res) => {
        console.log(res);
        var code = [];
        for (var i = 0 ; i < res.length ; ++i) {
          var name = res[i].name;
          if (name === 'Other') {
            this.setState({otherId: res[i].typeid});
          }
          var sub = <div key={res[i]._id}>
              <input  onChange={this.onReasonChange} type="radio" name="gender" value={res[i].typeid}/>
              {' ' + name}
              <br/>
          </div>
          
          code.push(sub)
        }
        this.setState({typeCode: <div>
          <label htmlFor="report">Report content</label>
              {code}
        </div>, loadType: true});
      })
      
      
    }

    onReasonChange = (e) => {
        var vis = "hidden";
        console.log(this.state.otherId);
        console.log(e.target.value);
        if (e.target.value == this.state.otherId) {
            vis = "visible";
        }
        console.log(vis);
        this.setState({visibility: vis, selection: e.target.value});
    }

    onSubmit = (e) => {
      console.log(this.state.selection);
      console.log(this.state.description);
      var data = {songId: this.props._id, 
        reasonId: this.state.selection, 
        description: this.state.otherId == this.state.selection ? this.state.description : '',
        username: this.props.username};
      ReportService.handleSubmitReport(data, (res) => {
        message.info("Submitted");
      }, err => {
        message.error("You already reported this song");
      })
        
    }



    render() {
        return (
            <div>
<Modal
            isOpen={this.state.isOpen}
            onRequestClose={this.props.onClose}
            style={customStyles}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
            contentLabel="Example Modal"
            >
                <div className="inline fields">
                {this.state.loadType ? this.state.typeCode : null}
                    <TextareaAutosize
                    style={{visibility: this.state.visibility}}
                    minRows={3}
                    maxRows={6}
                    onChange={(e) => this.setState({description: e.target.value})}
                    placeholder="Tell us more about you..."
                    />
                </div>

                <div className="nav-panel">
                  <button className="ui icon left labeled button" onClick={this.props.onClose}>
                    <i aria-hidden="true" className="left arrow icon" ></i>Cancel</button>
                  <button className="ui icon right labeled button" onClick={this.onSubmit}>Submit
                    <i aria-hidden="true" className="right arrow icon">
                    </i>
                  </button>
                </div>



            </Modal>
            </div>
            
        );
    }
}


function mapStateToProps(state) {
  return {
    _id: state.songInfo._id,
    name: state.songInfo.songName,
    link: state.songInfo.songLink,
    artist: state.songInfo.songArtist,
    avatar: state.songInfo.songAvatar,
    numLike: state.songInfo.numLike,
    numListen: state.songInfo.numListen,
    songType: state.songInfo.songType,
    lyrics: state.songInfo.lyrics,
    datePosted: state.songInfo.datePosted,
    listCmt: state.songInfo.listCmt,
    username: state.user.username
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportModal);