import React from "react";
import "../assets/css/Comment.css";
import { Button, Comment, Form, Header, Grid, Image } from "semantic-ui-react";

const logo = "https://github.com/trungnhanuchiha/maynhac/blob/server/client/src/assets/imgs/logo.jpg?raw=true";

const CommentPart = () => (
  <Comment.Group className="cmt-wrapper" size="huge">
    <div>
      <Form reply>
        <Grid>
          <Grid.Column width={1}>
            <Image
              src={logo}
              alt="user-avatar"
            />
          </Grid.Column>
          <Grid.Column width={12}>
            <Form.Field>
              <input placeholder="Write a comment here..." />
            </Form.Field>
          </Grid.Column>

          <Grid.Column width={3}>
            <Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
              className="cmt-add-reply"
            />
          </Grid.Column>
        </Grid>
      </Form>
    </div>
    <br />
    <Header as="h3" dividing>
      Comments
    </Header>
    <Comment>
      <Comment.Avatar src={logo} />
      <Comment.Content>
        <Comment.Author as="a"> Matt </Comment.Author>
        <Comment.Metadata>
          <div> Today at 5: 42 PM </div>
        </Comment.Metadata>
        <Comment.Text> How artistic! </Comment.Text>
        <Comment.Actions>
          <Comment.Action> Reply </Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
    <Comment>
      <Comment.Avatar src={logo} />
      <Comment.Content>
        <Comment.Author as="a"> Elliot Fu </Comment.Author>
        <Comment.Metadata>
          <div> Yesterday at 12: 30 AM </div>
        </Comment.Metadata>
        <Comment.Text>
          <p> This has been very useful for my research.Thanks as well! </p>
        </Comment.Text>
        <Comment.Actions>
          <Comment.Action> Reply </Comment.Action>
        </Comment.Actions>
      </Comment.Content>
      <Comment.Group>
        <Comment>
          <Comment.Avatar src={logo} />
          <Comment.Content>
            <Comment.Author as="a"> Jenny Hess </Comment.Author>
            <Comment.Metadata>
              <div> Just now </div>
            </Comment.Metadata>
            <Comment.Text> Elliot you are always so right: ) </Comment.Text>
            <Comment.Actions>
              <Comment.Action> Reply </Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </Comment>
    <Comment>
      <Comment.Avatar src={logo} />
      <Comment.Content>
        <Comment.Author as="a"> Joe Henderson </Comment.Author>
        <Comment.Metadata>
          <div> 5 days ago </div>
        </Comment.Metadata>
        <Comment.Text> Dude, this is awesome.Thanks so much </Comment.Text>
        <Comment.Actions>
          <Comment.Action> Reply </Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  </Comment.Group>
);

export default CommentPart;
