import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import './MeasurementItemComponent.css'


class MeasurementItemComponent extends Component {

    state = {
        measurement : null
    }

    componentDidMount = () => {
        this.getLatestMeasurement();
    }

    getLatestMeasurement = () => { 
        axios.get(`/api/data/device/${this.props.deviceId}/latest`)
        .then(response => {
            this.setState({
                measurement : response.data.result
            })
        })  
    }

    render() { 
        return (
            
            <div>
                {this.state.measurement==null?

                <div className="measurementItem">
                    <h2>Device: {this.props.deviceId}</h2>
                    No data.
                    <hr/>
                </div>

                :

                <div className="measurementItem">
                    <h2>Device: {this.props.deviceId}</h2>

                    <div>Temperature:   {this.state.measurement.temperature}</div>
                    <div>Gyroscope:     ({this.state.measurement.gyroX}, {this.state.measurement.gyroY}, {this.state.measurement.gyroZ})</div>
                    <div>Accelerometer: ({this.state.measurement.accX}, {this.state.measurement.accY}, {this.state.measurement.accZ})</div>
                    <div>Magnetometer:  ({this.state.measurement.magX}, {this.state.measurement.magY}, {this.state.measurement.magZ})</div>
                    <div>Date:          {moment(this.state.measurement.date).format('DD-MM-YYYY HH:mm')}</div>

                    <Link to = {{pathname: '/device/' + this.props.deviceId, myParam: 'CHART'}}> More data... </Link>
                    <hr/>
                </div>
                
                }

            </div>
         );
    }

    
}
 
export default MeasurementItemComponent;