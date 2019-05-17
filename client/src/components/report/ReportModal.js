import React, {Component} from 'react';
import Modal from 'react-modal';
import { Tree } from 'antd';
import TextareaAutosize from "react-textarea-autosize";

 
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
        this.state = {isOpen: this.props.isOpen, selection: "", visibility: "hidden"};
    } 

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("Receive " + nextProps.isOpen);
        if (nextProps.isOpen !== prevState.isOpen) {
          return ({isOpen: nextProps.isOpen});
        }
        else {
          return null;
        }
      }

    onReasonChange = (e) => {
        var vis = "hidden";
        if (e.target.value === "other") {
            vis = "visible";
        }
        this.setState({visibility: vis, selection: e.target.value});
        
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
                <div class="inline fields">
                    <label for="fruit">Report content</label>
                    <input onChange={this.onReasonChange} type="radio" name="gender" value="sexual"/> Sexual content<br/>
                    <input onChange={this.onReasonChange} type="radio" name="gender" value="spam"/> Spam or misleading<br/>
                    <input onChange={this.onReasonChange} type="radio" name="gender" value="lyric"/> Lyrics issue<br/>
                    <input onChange={this.onReasonChange} type="radio" name="gender" value="other"/> Other<br/>
                    <TextareaAutosize
                    style={{visibility: this.state.visibility}}
                    minRows={3}
                    maxRows={6}
                    placeholder="Tell us more about you..."
                    />
                </div>



            </Modal>
            </div>
            
        );
    }
}

export default ReportModal;