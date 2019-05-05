import React from 'react';
import { Carousel } from 'antd';
import HomePageService from '../services/HomePageService';
import 'antd/dist/antd.css';
import '../assets/css/HomePage.css'

class HomePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            ImagesAutoPlay : []
        }
    }
    componentDidMount(){
        HomePageService.handleGetImagesAutoPlay((res) => {
            this.setState({ImagesAutoPlay: res});
        });
    }
    getDivImagesAutoPlay(){
        return this.state.ImagesAutoPlay.map((object, idx) => {
            return <img src = {object} key ={idx} ></img>
        });
    }
    render() {
        return(
        <Carousel autoplay >
            {this.getDivImagesAutoPlay()}
        </Carousel>
      )
    }
}

export default HomePage;