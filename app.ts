import express = require('express');
import cors = require('cors');
import bodyParser = require("body-parser");
import {DevicesRouter} from "./controllers/devices";

// Create a new express application instance
const app: express.Application = express();

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

app.use('/devices', DevicesRouter);

app.listen(3000, function () {
    console.log('Devices server listening on port 3000');
    console.log('Look at https://github.com/AmitArbel/pan.assignment for client details.');
});