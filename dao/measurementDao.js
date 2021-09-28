const dao = require('./dao');
const moment = require ('moment');

exports.getAllMeasurements = (callback) => {
    let queryString = 'SELECT * FROM measurement';
    dao.sendQuery(queryString, result => {
        return callback(result);
    })
}

exports.getMeasurementById = (measurementId, callback) => {
    let queryString = `SELECT * FROM measurement WHERE id = ${measurementId}`;
    dao.sendQuery(queryString, result => {
        if(result&&result.length>0) return callback(result[0]);
        else return callback(null);
    })
}

exports.getMeasurementsByDeviceId = (deviceId, callback) => {
    let queryString = `SELECT * FROM measurement WHERE deviceId = ${deviceId}`;
    dao.sendQuery(queryString, result => {
         return callback(result);
    })
}

exports.getLatestMeasurementByDeviceId = (deviceId, callback) => {
    let queryString = `SELECT * FROM measurement WHERE deviceId = ${deviceId} order by id desc limit 1`;
    dao.sendQuery(queryString, result => {
        if(result&&result.length>0) return callback(result[0]);
        else return callback(null);
    })
}

exports.addMeasurement = (measurement, callback) => {
    let date = moment().utc().format("YYYY-MM-DD HH:mm:ss");
    let queryString = `INSERT INTO measurement(temperature, gyroX, gyroY, gyroZ, accX, accY, accZ, magX, magY, magZ, date, deviceId)
                        VALUES (${measurement.temperature}, ${measurement.gyroX}, ${measurement.gyroY}, ${measurement.gyroZ},
                        ${measurement.accX}, ${measurement.accY}, ${measurement.accZ},
                        ${measurement.magX}, ${measurement.magY}, ${measurement.magZ}, '${date}', ${measurement.deviceId})`;
    dao.sendQuery(queryString, result => {
        return callback(result);
    })
}

/*
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
*/

exports.deleteMeasurement = (measurementId, callback) => {
    let queryString = `DELETE FROM measurement WHERE id = ${measurementId}`;
    dao.sendQuery(queryString, result => {
        return callback(result);
    })
}
