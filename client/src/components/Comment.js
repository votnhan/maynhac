import React from "react";
import "../assets/css/Comment.css";
import { Button, Comment, Form, Header, Grid, Image } from "semantic-ui-react";
import SongService from "../services/SongService";
import { connect }from "react-redux";

const logo =
  "https://github.com/trungnhanuchiha/maynhac/blob/server/client/src/assets/imgs/logo.jpg?raw=true";

class CommentPart extends React.Component {

  componentDidMount(){
      console.log("listcmt", this.props.listCmt)
  }

  render() {
    const CmtCard = (obj, i) => (
      <Comment>
        <Comment.Avatar src={logo} />
        <Comment.Content>
          <Comment.Author as="a"> {obj.commentator} </Comment.Author>
          <Comment.Metadata>
            <div> {obj.datecomment} </div>
          </Comment.Metadata>
          <Comment.Text>{obj.content} </Comment.Text>
        </Comment.Content>
      </Comment>
    );

    return (
      <Comment.Group className="cmt-wrapper" size="huge">
        <div>
          <Form reply>
            <Grid>
              <Grid.Column width={1}>
                <Image src={logo} alt="user-avatar" />
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
        {this.props.listCmt.map((object, idx) => CmtCard(object, idx))}
      </Comment.Group>
    );
  }
}


function mapStateToProps(state) {
    return {
      
      listCmt: state.songInfo.listCmt
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CommentPart);
  