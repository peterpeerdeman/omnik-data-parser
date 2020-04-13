'use strict';

const omnikDataParser = require('../index');
const expect = require('chai').expect;
const fs = require('fs');

describe('Omnik Data Parser', () => {
    it('should be a function', () => {
        expect(omnikDataParser).to.be.a('function');
    });

    it('should parse sunny omnik data', () => {
        const data = fs.readFileSync('test/testcapture-omnik-2000tl2-01-sunny.cap');
        const result = omnikDataParser(data);
        expect(result).to.be.an('object');
        expect(result.temperature).to.be.closeTo(39.2, 0.001);
        expect(result.vpv1).to.be.closeTo(191.2, 0.001);
        expect(result.etotal).to.be.closeTo(114.5, 0.001);
        expect(result.htotal).to.eql(346);
    });

    it('should parse cloudy omnik data', () => {
        const data = fs.readFileSync('test/testcapture-omnik-2000tl2-02-cloudy.cap');
        const result = omnikDataParser(data);
        expect(result).to.be.an('object');
        expect(result.temperature).to.eql(0);
        expect(result.vpv1).to.eql(0);
    });

    it('should throw an error on too short data object', () => {
        const shortbuffer = new Buffer([0x00, 0x01]);
        expect(function() {
            omnikDataParser(shortbuffer);
        }).to.throw('omnik data is too short');
    });

    it('should not parse incorrect temperature data', () => {
        const data = fs.readFileSync('test/testcapture-omnik-2000tl2-02-cloudy.cap');
        const result = omnikDataParser(data);
        expect(result.temperature).to.eql(0);
    });
});
