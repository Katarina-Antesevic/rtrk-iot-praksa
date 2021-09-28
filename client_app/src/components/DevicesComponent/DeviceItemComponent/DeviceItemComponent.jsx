import React, { Component } from 'react';
import '../../../Style.css';
import './DeviceItemComponent.css';


class DeviceItemComponent extends Component {
    state = { 
        newMeasurementInterval : this.props.device.measurementInterval,
        device : this.props.device
     }
    render() { 
        return ( 
            <div className="deviceItemComponent">
                <div className="deviceItemFormGroup">
                    <div className="customLabel">ID : </div>
                    <div>{this.props.device.id}</div>
                </div>
                <div className="deviceItemFormGroup">
                    <div className="customLabel">Serial number : </div>
                    <div>{this.props.device.serialNumber}</div>
                </div>
                <div className="deviceItemFormGroup">
                    <div className="customLabel">Measurement interval : </div>
                    <input className="device-input customLabel" type='text' value={this.state.newMeasurementInterval} onChange={this.handleMeasurementIntervalInputChange}></input>
                    <button className="btn btn-primary" onClick={this.updateDevice}>SET</button>
                </div>
            </div>
         );
    }

    handleMeasurementIntervalInputChange = (event) => {
        this.setState({
            newMeasurementInterval : event.target.value
        })
    }

    updateDevice = () => {
        this.props.updateDeviceHandler(this.props.device, this.state.newMeasurementInterval);
    }
}
 
export default DeviceItemComponent;