import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';
import DeviceItemComponent from './DeviceItemComponent/DeviceItemComponent';
import qs from 'qs';
import '../../Style.css';
import './DevicesComponent.css'

class DevicesComponent extends Component {
    
    constructor(props){
        super(props);
        this.state.deviceId = this.props.match?.params?.id ? this.props.match.params.id : 'NO PARAMS PASSED';
        let queryParams = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
        this.state.myParam = queryParams?.myParam;
    }
    state = { 
        devices:null,
        measurementInterval : '',
        serialNumber : ''
     }

    componentDidMount(){
        this.getAllDevices();
    }

    getAllDevices = () => {
        axios.get('/api/device')
        .then(response => {
            this.setState({
                devices : response.data.devices
            })
        })
    }

    mapDevices = () => {
        let devices = this.state.devices;
        return(
            devices==null?

            <div>
                <div>
                    Loading devices...
                </div>
                <hr/>
            </div>

            :

            devices&&devices.length>0? devices.map(device => (
                <div key={device.id}>
                    <DeviceItemComponent 
                        device = {device}
                        deleteDeviceHandler = {this.deleteDevice}
                        updateDeviceHandler = {this.updateDevice}
                    >
                    </DeviceItemComponent>
                    <hr/>
                </div>
                
            ))

            :

            <div>
                <div>
                    No devices.
                </div>
                <hr/>
            </div>

        )
    }

    deleteDevice = (device) => {
        axios.delete('/api/device/' + device.id).then(response => {
            this.setState({
                devices : this.state.devices.filter(singleDevice => singleDevice.id != device.id)
            })
        })
    }

    updateDevice = (device, newMeasurementInterval) => {
        let body = {
            measurementInterval : newMeasurementInterval
        }
        axios.put('/api/device/' + device.id +'/measurementInterval',  JSON.stringify(body), {
            headers: {
                'Content-type' : 'application/json'
            }
        }).then(response => {
            this.setState({
                devices : this.state.devices.map(singleDevice => {
                    if(singleDevice.id!=device.id) return singleDevice;
                    else{
                        singleDevice.measurementInterval = newMeasurementInterval;
                    }
                    return singleDevice;
                })
            })
        })
    }

    handleMeasurementIntervalInputChange = (event) => {
        this.setState({
            measurementInterval : event.target.value
        })
    }

    handleSerialNumberInputChange = (event) => {
        this.setState({
            serialNumber : event.target.value
        })
    }

    addDevice = () => {
        let body = {
            measurementInterval : this.state.measurementInterval,
            serialNumber : this.state.serialNumber
        }
        axios.post('/api/device' , JSON.stringify(body), {
            headers: {
                'Content-type' : 'application/json'
            }
        }).then(response => {
            let devices = this.state.devices;
            devices.push({
                measurementInterval : this.state.measurementInterval,
                serialNumber : this.state.serialNumber,
                id : response.data.result.insertId
            })
            this.setState({
                devices : devices
            })
        })
    }


    render() { 
        return ( 
            <div className="devicesComponent background">
                <div className="devicesList">
                    <h1>Devices:</h1>
                    {this.mapDevices()}
                </div>
                
                <div className="addNewDevice">
                    <h1>Add new device</h1>
                    <div className="addNewDeviceInputGroup">
                        <label>Serial number</label>
                        <input type='text' value={this.state.serialNumber} onChange={this.handleSerialNumberInputChange}></input>
                    </div>
                    <div className="addNewDeviceInputGroup">
                        <label>Measurement interval</label>
                        <input type='text' value={this.state.measurementInterval} onChange={this.handleMeasurementIntervalInputChange}></input>
                    </div>
                    <button className="btn btn-primary btn-block customButton" onClick={this.addDevice}>ADD DEVICE</button>
                </div>
            </div>
         );
    }
}
 
export default DevicesComponent;