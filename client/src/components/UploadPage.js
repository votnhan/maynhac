import React, {Component} from "react";
import "../assets/css/UploadPage.css";
import { Form, Button, Segment, Header, Icon, Step, Label, Container, Grid } from "semantic-ui-react";
import Dropzone from 'react-dropzone'

class UploadBox extends Component{
    render(){
        if (this.props.currentStep !== 1) {
            return null;
        }
         const files = this.props.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
        ));

        return (<div className="upload-box-wrapper">
            <Dropzone onDrop={this.props.handleFilesChange}>
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
                {this.props.files.length ? <ul>this.props.files</ul> :
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
            </Dropzone></div>
        )
    }
}

class SongDetails extends Component{
    render(){
        const { values } = this.props;
        if (this.props.currentStep !== 2) {
            return null;
        }
        return(<div className="song-details-wrapper">
            <Form color='green' >
                <Form.Field>
                    <label>Title</label>
                    <input
                    name='title'
                    value={this.props.title}
                    placeholder='Title'
                    onChange={this.props.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Author</label>
                    <input
                    name='author'
                    value={this.props.author}
                    placeholder='Author'
                    onChange={this.props.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Artist</label>
                    <input
                    name='artist'
                    value={this.props.artist}
                    placeholder='Artist'
                    onChange={this.props.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Lyrics</label>
                    <input
                    name='lyrics'
                    value={this.props.lyrics}
                    placeholder='Lyrics'
                    onChange={this.props.handleChange}
                    />
                </Form.Field>
            </Form></div>
        )
    }
}

class UploadDone extends Component{
    render(){
        if (this.props.currentStep !== 3) {
            return null;
        }

        return (<div className="upload-done-wrapper">

  <Grid>
    <Grid.Row>
      <Grid.Column>
                    <Icon circular color='green' name='checkmark' size='massive'/>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
                <Label horizontal size='massive'>
                    Success!
                </Label>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
                <Header as="h1">{this.props.files}</Header>
    </Grid.Row>
  </Grid>
            </div>
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
        this.handleFilesChange = this.handleFilesChange.bind(this);
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
    handleFilesChange(acceptedFiles) {
        this.setState({files: acceptedFiles});
    }
    handleChange(event) {
        const {name, value} = event.target;
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
            <section className="upload-container">
            <div className="step-group">
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
            <UploadBox files={this.state.files} currentStep={this.state.currentStep} handleChange={this.handleChange} handleFilesChange={this.handleFilesChange}/>
            <SongDetails currentStep={this.state.currentStep} handleChange={this.handleChange} title={this.state.title} author={this.state.author} artist={this.state.artist} lyrics={this.state.lyrics} />
            <UploadDone currentStep={this.state.currentStep} title={this.state.title} files={this.state.files}/>
            <div className="nav-panel">
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


        onFormSubmit = e => {
            e.preventDefault();
            console.log(this.state);
        };
    }

    export default UploadPage;
