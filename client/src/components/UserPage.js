import React, {Component} from 'react';
import {connect} from 'react-redux';
import "../assets/css/UserPage.css";


class UserPage extends Component {

    constructor() {
      super();
      this.state = {activeItem : 'Songs'};
    }

    getClass = (name) => {
      if (name === this.state.activeItem) {
        return "item active";
      }
      else {
        return "item";
      }
    }

    onItemSelected = (e) => {
      this.setState({activeItem: e.target.name});
    }

    createMenuItem = (name, isActive) => {
      return (
        <a name={name} href="true" onClick={this.onItemSelected} className={this.getClass(name)}>{name}</a>
      );
    }


    render() {
        return (
            <div className="container">
                    <div className="left">
                    <div className="ui secondary vertical pointing menu">
                      {this.createMenuItem("Songs", false)}
                      {this.createMenuItem("Playlists", false)}
                      {this.createMenuItem("Artists", false)}
                      {this.createMenuItem("Upload", false)}
                    </div>

                    </div>

                    <div className="right">
                    </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
      ...state
    };
  }

  const mapDispatchToProps = dispatch => {
    return  {
      onUserLogout: () => dispatch({type: 'LOGOUT'}) 
    }; 
  
  }

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);