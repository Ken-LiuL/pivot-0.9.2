"use strict";
var chai_1 = require('chai');
var tester_1 = require('immutable-class/build/tester');
var plywood_1 = require('plywood');
var measure_1 = require('./measure');
describe('Measure', function () {
    it('is an immutable class', function () {
        tester_1.testImmutableClass(measure_1.Measure, [
            {
                name: 'price',
                title: 'Price',
                expression: plywood_1.$('main').sum('$price').toJS()
            },
            {
                name: 'avg_price',
                title: 'Average Price',
                expression: plywood_1.$('main').average('$price').toJS()
            }
        ]);
    });
    describe('.measuresFromAttributeInfo', function () {
        it('works with sum', function () {
            var attribute = plywood_1.AttributeInfo.fromJS({
                "name": "price",
                "type": "NUMBER",
                "unsplitable": true,
                "makerAction": {
                    "action": "sum",
                    "expression": {
                        "name": "price",
                        "op": "ref"
                    }
                }
            });
            var measures = measure_1.Measure.measuresFromAttributeInfo(attribute).map((function (m) { return m.toJS(); }));
            chai_1.expect(measures).to.deep.equal([
                {
                    "expression": {
                        "action": {
                            "action": "sum",
                            "expression": {
                                "name": "price",
                                "op": "ref"
                            }
                        },
                        "expression": {
                            "name": "main",
                            "op": "ref"
                        },
                        "op": "chain"
                    },
                    "name": "price",
                    "title": "Price"
                }
            ]);
        });
        it('works with min', function () {
            var attribute = plywood_1.AttributeInfo.fromJS({
                "name": "price",
                "type": "NUMBER",
                "unsplitable": true,
                "makerAction": {
                    "action": "min",
                    "expression": {
                        "name": "price",
                        "op": "ref"
                    }
                }
            });
            var measures = measure_1.Measure.measuresFromAttributeInfo(attribute).map((function (m) { return m.toJS(); }));
            chai_1.expect(measures).to.deep.equal([
                {
                    "expression": {
                        "action": {
                            "action": "min",
                            "expression": {
                                "name": "price",
                                "op": "ref"
                            }
                        },
                        "expression": {
                            "name": "main",
                            "op": "ref"
                        },
                        "op": "chain"
                    },
                    "name": "price",
                    "title": "Price"
                }
            ]);
        });
        it('works with max', function () {
            var attribute = plywood_1.AttributeInfo.fromJS({
                "name": "price",
                "type": "NUMBER",
                "unsplitable": true,
                "makerAction": {
                    "action": "max",
                    "expression": {
                        "name": "price",
                        "op": "ref"
                    }
                }
            });
            var measures = measure_1.Measure.measuresFromAttributeInfo(attribute).map((function (m) { return m.toJS(); }));
            chai_1.expect(measures).to.deep.equal([
                {
                    "expression": {
                        "action": {
                            "action": "max",
                            "expression": {
                                "name": "price",
                                "op": "ref"
                            }
                        },
                        "expression": {
                            "name": "main",
                            "op": "ref"
                        },
                        "op": "chain"
                    },
                    "name": "price",
                    "title": "Price"
                }
            ]);
        });
        it('works with histogram', function () {
            var attribute = plywood_1.AttributeInfo.fromJS({
                "name": "delta_hist",
                "special": "histogram",
                "type": "NUMBER"
            });
            var measures = measure_1.Measure.measuresFromAttributeInfo(attribute).map((function (m) { return m.toJS(); }));
            chai_1.expect(measures).to.deep.equal([
                {
                    "expression": {
                        "action": {
                            "action": "quantile",
                            "expression": {
                                "name": "delta_hist",
                                "op": "ref"
                            },
                            "quantile": 0.95
                        },
                        "expression": {
                            "name": "main",
                            "op": "ref"
                        },
                        "op": "chain"
                    },
                    "name": "delta_hist_p95",
                    "title": "Delta Hist P95"
                },
                {
                    "expression": {
                        "action": {
                            "action": "quantile",
                            "expression": {
                                "name": "delta_hist",
                                "op": "ref"
                            },
                            "quantile": 0.99
                        },
                        "expression": {
                            "name": "main",
                            "op": "ref"
                        },
                        "op": "chain"
                    },
                    "name": "delta_hist_p99",
                    "title": "Delta Hist P99"
                }
            ]);
        });
        it('works with unique', function () {
            var attribute = plywood_1.AttributeInfo.fromJS({
                "name": "unique_page",
                "special": "unique",
                "type": "STRING"
            });
            var measures = measure_1.Measure.measuresFromAttributeInfo(attribute).map((function (m) { return m.toJS(); }));
            chai_1.expect(measures).to.deep.equal([
                {
                    "expression": {
                        "action": {
                            "action": "countDistinct",
                            "expression": {
                                "name": "unique_page",
                                "op": "ref"
                            }
                        },
                        "expression": {
                            "name": "main",
                            "op": "ref"
                        },
                        "op": "chain"
                    },
                    "name": "unique_page",
                    "title": "Unique Page"
                }
            ]);
        });
        it('works with theta', function () {
            var attribute = plywood_1.AttributeInfo.fromJS({
                "name": "page_theta",
                "special": "theta",
                "type": "STRING"
            });
            var measures = measure_1.Measure.measuresFromAttributeInfo(attribute).map((function (m) { return m.toJS(); }));
            chai_1.expect(measures).to.deep.equal([
                {
                    "expression": {
                        "action": {
                            "action": "countDistinct",
                            "expression": {
                                "name": "page_theta",
                                "op": "ref"
                            }
                        },
                        "expression": {
                            "name": "main",
                            "op": "ref"
                        },
                        "op": "chain"
                    },
                    "name": "page_theta",
                    "title": "Page Theta"
                }
            ]);
        });
    });
});
