import express = require('express');
import {Devices} from "./devices";

// Create a new express application instance
const app: express.Application = express();
const devicesSvc = new Devices();

app.get('/devices', (req: Request, res: Response) => {
    const devices = devicesSvc.getDevices();
    res.send(devices);
});

app.listen(3000, function () {
    console.log('Devices server listening on port 3000');
});