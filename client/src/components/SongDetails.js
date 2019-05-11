import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

class SongDetails extends Component{

    saveAndContinue = (e) => {
        e.preventDefault()
        this.props.nextStep()
    }

    render(){
        const { values } = this.props;
        return(
            <Form color='green' >
                <Form.Field>
                    <label>Title</label>
                    <input
                    placeholder='Title'
                    onChange={this.props.handleChange('title')}
                    defaultValue={values.title}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Author</label>
                    <input
                    placeholder='Author'
                    onChange={this.props.handleChange('author')}
                    defaultValue={values.author}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Artist</label>
                    <input
                    placeholder='Artist'
                    onChange={this.props.handleChange('artist')}
                    defaultValue={values.artist}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Lyrics</label>
                    <input
                    placeholder='Lyrics'
                    onChange={this.props.handleChange('lyrics')}
                    defaultValue={values.lyrics}
                    />
                </Form.Field>
                <Button onClick={this.saveAndContinue}>Continue</Button>
            </Form>
        )
    }
}

export default SongDetails;