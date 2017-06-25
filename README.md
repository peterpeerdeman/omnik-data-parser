# omnik-data-parser

[![Build Status](https://travis-ci.org/peterpeerdeman/omnik-data-parser.svg?branch=master)](https://travis-ci.org/peterpeerdeman/omnik-data-parser)

Parses omnik solar inverter data and returns the data in a structured readable json object

## Installation

`npm install omnik-data-parser`

## Usage

```
var omnikDataParser = require('omnik-data-parser');

// when parsing a buffer from file
var data = fs.readFileSync('test/testcapture-omnik-2000tl2-01-sunny.cap');
var result = omnikDataParser(data);

// simple server
const net = require('net');

net.createServer(function (socket) {
    socket.on('data', function(data) {
        console.log(data.toString('utf8'));
        if (argv.save) {
            fs.appendFile(new Date().toString() + '.cap', data, function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
        }

        const solardata = omnikDataParser(data);
        console.log(solardata);
    });
}).listen(argv.port);
```

## JSON object output

```
{
    header: '68a941b0',
    unknown: '0448146004481460810201',
    serialnumber: 'NLBN2020172Q2146',
    temperature: 39.2,
    vpv1: 191.2,
    vpv2: 0,
    vpv3: 0,
    ipv1: 2.9,
    ipv2: 0.1,
    ipv3: 0,
    iac1: 2.3,
    iac2: 0,
    iac3: 0,
    vac1: 230.4,
    vac2: 0,
    vac3: 0,
    fac1: 49.97,
    pac1: 528,
    fac2: 0,
    pac2: 0,
    fac3: 0,
    pac3: 0,
    etoday: 4.1,
    etotal: 114.5,
    htotal: 346
}
```

## Tests

`npm test`
