import React from 'react';
import {LineChart, XAxis, Tooltip, CartesianGrid, Line, YAxis, Legend} from 'recharts';
import HomePageService from '../services/HomePageService';

class ChartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songs:[],
            dataforchart:[]
        };
        this.timetogetData = 3600000
        this.hours = 24;
    }
    getIteminChart(i, songs){
        var countlisten = []
        songs.forEach(element => {
            countlisten.push(element.listentimein24h[i]);
        });
        var item = {...countlisten};
        item.name = i.toString();
        return item;
    }
    getData(){
        HomePageService.handleGetManySong(5, (songs) =>{
            var result = [];
            for (let i = 0;i<this.hours;++i){
                result.push(this.getIteminChart(i, songs));
            }
            this.setState({songs, dataforchart: result});
        });
    }
    componentDidMount(){
        this.getData();
        setInterval(this.getData, this.timetogetData);
    }
    render() {
        return (
            <div>
                <div>Chart page</div>
                <LineChart
                    width={1000}
                    height={400}
                    data={this.state.dataforchart}
                    margin={{ top:15, right: 20, left: 30, bottom: 5 }}
                    >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Line type="linear" dataKey="['0']" stroke="#0000FF"  />
                    <Line type="linear" dataKey="['1']" stroke="#008000" /> 
                    <Line type="linear" dataKey="['2']" stroke="#FF0000"  />
                </LineChart>
            </div>
        )
    }
}

export default ChartPage;