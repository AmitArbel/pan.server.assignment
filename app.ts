import express = require('express');
import cors = require('cors');
import {Devices} from "./devices";
import bodyParser = require("body-parser");

// Create a new express application instance
const app: express.Application = express();
const devicesSvc = new Devices();

var allowedOrigins = ['http://localhost:4200'];
app.use(cors({
    origin: function(origin, callback){
        if (!origin) {
            return callback(null, true);
        }

        if(allowedOrigins.indexOf(origin) < 0){
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }

        return callback(null, true);
    }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/devices', (req: Request, res: Response) => {
    const devices = devicesSvc.getDevices();
    res.send(devices);
});

app.post('/device', (req: Request, res: Response) => {
    const newDevice = devicesSvc.addDevice(req.body);
    res.send(newDevice);
});

app.listen(3000, function () {
    console.log('Devices server listening on port 3000');
});