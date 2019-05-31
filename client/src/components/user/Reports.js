import React, { Component } from "react";
import ReportCard from './ReportCard';
import {connect} from 'react-redux';
import UserService from '../../services/UserService';
import ReportService from "../../services/ReportService";



class Reports extends Component {

    constructor(props) {
        super(props);
        this.state = {code: [], loadCode: false};
    }

    componentDidMount() {
        if (this.state.loadCode !== true) {
            this.loadCode();
        }
    }

    componentDidUpdate() {
        if (this.state.loadCode !== true) {
            this.loadCode();
        }
    }

    loadCode = () => {
        UserService.handleMe((res) => {
            this.setState({code: []});
            if (res.report.length === 0) {
                this.setState({loadCode: true});
                return;
            }
            for (var i = 0 ; i < res.report.length; ++i) {
                this.setState({code: [...this.state.code, <ReportCard key={res.report[i].reportId} data={res.report[i]}/>]});
                if (i === res.report.length - 1) {
                    this.setState({loadCode: true});
                }
            }
            
        })
        
    }

    render() {
        return (
            <div className="ui items">
                {this.state.code}
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

export default connect(mapStateToProps, mapDispatchToProps)(Reports);