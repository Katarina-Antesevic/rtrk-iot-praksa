const dao = require('./dao');

exports.getAllDevices = (callback) => {
    let queryString = 'SELECT * FROM device';
    dao.sendQuery(queryString, result => {
        return callback(result);
    })
}

exports.getDeviceById = (deviceId, callback) => {
    let queryString = `SELECT * FROM device WHERE id = ${deviceId}`;
    dao.sendQuery(queryString, result => {
        if(result&&result.length>0) return callback(result[0]);
        else return callback(null);
    })
}

exports.addDevice = (measurementInterval, serialNumber, callback) => {
    let queryString = `INSERT INTO device(measurementInterval, serialNumber) VALUES (${measurementInterval},'${serialNumber}')`;
    dao.sendQuery(queryString, result => {
        return callback(result);
    })
}

exports.updateDeviceMeasurementInterval = (deviceId, measurementInterval, callback) => {
    let queryString = `UPDATE device SET measurementInterval = ${measurementInterval} WHERE id = ${deviceId}`;
    dao.sendQuery(queryString, result => {
        return callback(result);
    })
}

exports.updateDeviceSerialNumber = (deviceId, serialNumber, callback) => {
    let queryString = `UPDATE device SET serialNumber = '${serialNumber}' WHERE id = ${deviceId}`;
    dao.sendQuery(queryString, result => {
        return callback(result);
    })
}

exports.deleteDevice = (deviceId, callback) => {
    let queryString = `DELETE FROM device WHERE id = ${deviceId}`;
    dao.sendQuery(queryString, result => {
        return callback(result);
    })
}