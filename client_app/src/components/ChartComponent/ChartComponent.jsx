import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import './ChartComponent.css'
class ChartComponent extends Component {
    constructor(props){
        super(props);
        this.state.deviceId = props.match.params.id;
    }



    componentDidMount(){

        let gyroChartData = new Object();
        gyroChartData.labels=[];
        gyroChartData.datasets = [{
            label: 'Gyro X',
            borderColor : "red",
            fill:false,
            data:[]
        },{
            label: 'Gyro Y',
            borderColor: "blue",
            fill:false,
            data:[]
        },
        {
            label: 'Gyro Z',
            borderColor: "green",
            fill:false,
            data:[]
        }]

        let accChartData = new Object();
        accChartData.labels=[];
        accChartData.datasets = [{
            label: 'Acc X',
            borderColor : "red",
            fill:false,
            data:[]
        },{
            label: 'Acc Y',
            borderColor: "blue",
            fill:false,
            data:[]
        },
        {
            label: 'Acc Z',
            borderColor: "green",
            fill:false,
            data:[]
        }]

        let magChartData = new Object();
        magChartData.labels=[];
        magChartData.datasets = [{
            label: 'Mag X',
            borderColor : "red",
            fill:false,
            data:[]
        },{
            label: 'Mag Y',
            borderColor: "blue",
            fill:false,
            data:[]
        },
        {
            label: 'Mag Z',
            borderColor: "green",
            fill:false,
            data:[]
        }]

        let tempChartData = new Object();
        tempChartData.labels=[];
        tempChartData.datasets = [{
            label: 'Temperature',
            borderColor : "red",
            fill:false,
            data:[]
        }]

        axios.get('/api/data/device/' + this.state.deviceId)
        .then(response => {
            let measurements = response.data.result;
            let currentDate = moment().subtract(31, 'minutes');
            let currentDateString = currentDate.utc().format('YYYY-MM-DD HH:mm');
            for(let i = 0; i<31; i++){

                var flag = false;
                currentDate = currentDate.add(1, 'minutes');
                currentDateString = currentDate.utc().format('YYYY-MM-DD HH:mm');

                gyroChartData.labels.push(currentDate.utc().format('HH:mm'));
                accChartData.labels.push(currentDate.utc().format('HH:mm'));
                magChartData.labels.push(currentDate.utc().format('HH:mm'));
                tempChartData.labels.push(currentDate.utc().format('HH:mm'));

                for(let measurement of measurements){
                    let measurementDate = measurement.date;
                    
                    let measurementDateString = moment(measurementDate).utc().format('YYYY-MM-DD HH:mm');
                    if(measurementDateString == currentDateString){
                        flag = true;
                        gyroChartData.datasets[0].data.push(measurement.gyroX);
                        gyroChartData.datasets[1].data.push(measurement.gyroY);
                        gyroChartData.datasets[2].data.push(measurement.gyroZ);

                        accChartData.datasets[0].data.push(measurement.accX);
                        accChartData.datasets[1].data.push(measurement.accY);
                        accChartData.datasets[2].data.push(measurement.accZ);

                        magChartData.datasets[0].data.push(measurement.magX);
                        magChartData.datasets[1].data.push(measurement.magY);
                        magChartData.datasets[2].data.push(measurement.magZ);

                        tempChartData.datasets[0].data.push(measurement.temperature);

                        break;
                    }
                }

                if(!flag) {
                    gyroChartData.datasets[0].data.push(0);
                    gyroChartData.datasets[1].data.push(0);
                    gyroChartData.datasets[2].data.push(0);

                    accChartData.datasets[0].data.push(0);
                    accChartData.datasets[1].data.push(0);
                    accChartData.datasets[2].data.push(0);

                    magChartData.datasets[0].data.push(0);
                    magChartData.datasets[1].data.push(0);
                    magChartData.datasets[2].data.push(0);

                    tempChartData.datasets[0].data.push(0);
                }
            }
           

            this.setState({ 

                gyroChartData : {
                    ...gyroChartData},
                accChartData : {
                    ...accChartData},
                magChartData : {
                    ...magChartData},
                tempChartData : {
                    ...tempChartData}
                
            })  
        })


    }
    

    state = {

      }
    render() { 
        return ( 
            <div>
                <h1>Device {this.state.deviceId}</h1>
                <div>
                    {this.state.gyroChartData == null ? 
                        <div>
                            No chart data
                        </div>

                        :

                        <div className="chart-wrapper">
                            <h3>Gyroscope measurements:</h3>
                            <Line data = {this.state.gyroChartData}></Line>
                        </div>
                        
                    }
                </div>
                <hr/>
                <div>
                    {this.state.accChartData == null ? 
                        <div>
                            No chart data
                        </div>

                        :

                        <div className="chart-wrapper">
                            <h3>Accelerometer measurements:</h3>
                            <Line data = {this.state.accChartData}></Line>
                        </div>
                        
                    }
                </div>
                <hr/>
                <div>
                    {this.state.magChartData == null ? 
                        <div>
                            No chart data
                        </div>

                        :

                        <div className="chart-wrapper">
                            <h3>Magnetometer measurements:</h3>
                            <Line data = {this.state.magChartData}></Line>
                        </div>
                    }
                </div>
                <hr/>
                <div>
                    {this.state.tempChartData == null ? 
                        <div>
                            No chart data
                        </div>

                        :

                        <div className="chart-wrapper">
                            <h3>Temperature measurements:</h3>
                            <Line data = {this.state.tempChartData}></Line>
                        </div>
                    }
                </div>
            </div>
         );
    }
}
 
export default ChartComponent;