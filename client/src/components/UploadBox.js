import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
class UploadBox extends Component{
    render(){
        if (this.props.currentStep != 1) {
            return null;
        }
        return
           (
               <Dropzone onDrop={this.onDrop}>
            {({getRootProps, getInputProps}) => (
                <section className="container">
                <div {...getRootProps({className: 'dropzone'})}>
                <input
                onChange={this.onFileSelected}
                type="file"
                accept="audio/*"
                name="file"
                className="inputfile"
                id="embedpollfileinput"
                {...getInputProps()}
                />
                <Segment placeholder>
                <Header icon>
                <Icon name="upload" />
                <div>
                {files.length > 0 ? <ul>{files}</ul> :
                'No documents are listed for this customer.'}
                </div>
                </Header>
                <label
                htmlFor="embedpollfileinput"
                className="ui huge red right floated button"
                >
                Upload!
                </label>
                </Segment>
                </div>
                </section>
            )}
            </Dropzone>
        )
    }
}

export default wserDetails;
