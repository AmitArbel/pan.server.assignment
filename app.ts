import express = require('express');
import cors = require('cors');
import bodyParser = require("body-parser");
import {DevicesRouter} from "./controllers/devices";

// Creating a new express application instance
const app: express.Application = express();


// Handling CORS case

// Allowing only BFF client
let allowedOrigins = ['http://localhost:4200'];
app.use(cors({
    origin: (origin, callback) => {
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

// Adding bodyParser for the POST (and PUT) calls
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Adding the "devices" API handler
app.use('/devices', DevicesRouter);

// Stating the application
app.listen(3000, function () {
    console.log('Devices server listening on port 3000');
    console.log('Look at https://github.com/AmitArbel/pan.assignment for client details.');
});