"use strict";
var chai_1 = require('chai');
require('../../utils/test-utils/index');
var plywood_1 = require('plywood');
var download_1 = require('./download');
describe.skip('Download', function () {
    describe('datasetToFileString', function () {
        it('defaults to JSON if no type specified', function () {
            var dsJS = [
                { x: 1, y: "hello", z: 2 },
                { x: 2, y: "world", z: 3 }
            ];
            var ds = plywood_1.Dataset.fromJS(dsJS);
            chai_1.expect(function () { JSON.parse(download_1.datasetToFileString(ds)); }).to.not.throw();
            chai_1.expect(JSON.parse(download_1.datasetToFileString(ds))).to.deep.equal(dsJS);
        });
        it('encloses set/string in brackets appropriately', function () {
            var ds = plywood_1.Dataset.fromJS([
                { y: ["dear", "john"] },
                { y: ["from", "peter"] }
            ]);
            chai_1.expect(download_1.datasetToFileString(ds, 'csv').indexOf("\"[dear,john\"]"), 'csv').to.not.equal(-1);
            chai_1.expect(download_1.datasetToFileString(ds, 'tsv').indexOf("[dear,john]"), 'tsv').to.not.equal(-1);
        });
    });
    describe('getMIMEType', function () {
        it('works as expected', function () {
            chai_1.expect(download_1.getMIMEType('csv'), 'csv').to.equal("text/csv");
            chai_1.expect(download_1.getMIMEType('tsv'), 'tsv').to.equal("text/tsv");
            chai_1.expect(download_1.getMIMEType(''), 'csv').to.equal('application/json');
            chai_1.expect(download_1.getMIMEType('json'), 'csv').to.equal('application/json');
            chai_1.expect(download_1.getMIMEType('invalid'), 'csv').to.equal('application/json');
        });
    });
});
