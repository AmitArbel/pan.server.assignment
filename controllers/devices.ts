import {Devices} from "../logic/devices";


// New Router for the "devices" API
const express = require('express');
export const DevicesRouter = express.Router();

// Creating an instance of the "devices" logic.
const devicesSvc = new Devices();

// Attaching handlers
DevicesRouter.route('/').get((req, res) => {
    const devices = devicesSvc.getDevices();
    res.send(devices);
});
DevicesRouter.route('/').post((req, res) => {
    const newDevice = devicesSvc.addDevice(req.body);
    res.send(newDevice);
});