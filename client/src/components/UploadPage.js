import React, {Component} from "react";
import "../assets/css/UploadPage.css";
import { Form, Button, Segment, Header, Icon, Step } from "semantic-ui-react";
import Dropzone from 'react-dropzone'

class UploadBox extends Component{
constructor() {
    super();
    this.onDrop = (files) => {
      this.setState({files})
    };
    this.state = {
      files: []
    };
  }

    render(){
        if (this.props.currentStep !== 1) {
            return null;
        }
         const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
        ));

        return (<Dropzone onDrop={this.onDrop}>
            {({getRootProps, getInputProps}) => (
                <section className="container">
                <div {...getRootProps({className: 'dropzone'})}>
                <input
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
                {this.state.files.length ? <ul>this.state.files</ul> :
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

class SongDetails extends Component{

    render(){
        const { values } = this.props;
        if (this.props.currentStep !== 2) {
            return null;
        }
        return(
            <Form color='green' class="song-details" >
                <Form.Field>
                    <label>Title</label>
                    <input
                    placeholder='Title'
                    />
                </Form.Field>
                <Form.Field>
                    <label>Author</label>
                    <input
                    placeholder='Author'
                    />
                </Form.Field>
                <Form.Field>
                    <label>Artist</label>
                    <input
                    placeholder='Artist'
                    />
                </Form.Field>
                <Form.Field>
                    <label>Lyrics</label>
                    <input
                    placeholder='Lyrics'
                    />
                </Form.Field>
            </Form>
        )
    }
}

class UploadPage extends Component {
    constructor(props) {
        super(props);
        this.onDrop = (files) => {
            this.setState({files})
        };
        this.state = {
            currentStep: 1,
            title: '',
            author: '',
            artist: '',
            lyrics: '',
            files: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this._next = this._next.bind(this);
        this._prev = this._prev.bind(this);
    }
    _next() {
    let currentStep = this.state.currentStep
    // If the current step is 1 or 2, then add one on "next" button click
    currentStep = currentStep >= 2? 3: currentStep + 1
    this.setState({
      currentStep: currentStep
    })
    }
    _prev() {
    let currentStep = this.state.currentStep
    // If the current step is 2 or 3, then subtract one on "previous" button click
    currentStep = currentStep <= 1? 1: currentStep - 1
    this.setState({
      currentStep: currentStep
    })
    }
    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }
    render() {

        // const files = this.state.files.map(file => (
        //     <li key={file.name}>
        //     {file.name} - {file.size} bytes
        //     </li>
        // ));
        return (
            <section class="upload-container">
            <div class="step-group">
            <Step.Group ordered>
            <Step>
            <Step.Content>
            <Step.Title>Upload</Step.Title>
            <Step.Description>Upload your songs.</Step.Description>
            </Step.Content>
            </Step>
            <Step>
            <Step.Content>
            <Step.Title>Information</Step.Title>
            <Step.Description>Enter song information</Step.Description>
            </Step.Content>
            </Step>
            <Step>
            <Step.Content>
            <Step.Title>Upload</Step.Title>
            </Step.Content>
            </Step>
            </Step.Group>
            </div>
            <div class="upload-box-wrapper">
            <UploadBox currentStep={this.state.currentStep} handleChange={this.handleChange}/>
            </div>
            <div class="song-details-wrapper">
            <SongDetails currentStep={this.state.currentStep} handleChange={this.handleChange}/>
            </div>
            <div class="nav-panel">
            <Button icon labelPosition='left' onClick={this._prev} disabled={this.state.currentStep === 3}>
            <Icon name='left arrow' />
      Go back
    </Button>
    <Button icon labelPosition='right' onClick={this._next} disabled={this.state.currentStep === 3}>
            {this.state.currentStep === 1 ? 'Continue' : 'Upload'}
      <Icon name='right arrow' />
    </Button>
            </div>
            </section>
            );
        }

        onInputChanged = e => {
            this.setState({ [e.target.name]: e.target.value });
        };

        onFileSelected = e => {
            this.setState({ file: e.target.files });
            console.log(e.target.files[0]);
            console.log(e.target.files.length);
        };

        onFormSubmit = e => {
            e.preventDefault();
            console.log(this.state);
        };
    }

    export default UploadPage;
