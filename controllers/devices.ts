import {Devices} from "../logic/devices";

const express = require('express');
export const DevicesRouter = express.Router();

const devicesSvc = new Devices();
DevicesRouter.route('/').get(function (req, res) {
    const devices = devicesSvc.getDevices();
    res.send(devices);
});
DevicesRouter.route('/').post(function (req, res) {
    const newDevice = devicesSvc.addDevice(req.body);
    res.send(newDevice);
});