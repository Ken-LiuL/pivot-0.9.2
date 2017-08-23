"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./immutable-input.css');
var React = require('react');
var ReactDOM = require('react-dom');
var dom_1 = require('../../utils/dom/dom');
var string_1 = require('../../utils/string/string');
var ImmutableInput = (function (_super) {
    __extends(ImmutableInput, _super);
    function ImmutableInput() {
        _super.call(this);
        this.focusAlreadyGiven = false;
        this.state = {};
    }
    ImmutableInput.prototype.initFromProps = function (props) {
        if (!props.instance || !props.path)
            return;
        this.setState({
            newInstance: props.instance,
            invalidValue: undefined
        });
    };
    ImmutableInput.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.instance !== this.state.newInstance) {
            this.initFromProps(nextProps);
        }
    };
    ImmutableInput.prototype.componentDidUpdate = function () {
        this.maybeFocus();
    };
    ImmutableInput.prototype.componentDidMount = function () {
        this.initFromProps(this.props);
        this.maybeFocus();
    };
    ImmutableInput.prototype.maybeFocus = function () {
        if (!this.focusAlreadyGiven && this.props.focusOnStartUp && this.refs['me']) {
            ReactDOM.findDOMNode(this.refs['me']).focus();
            this.focusAlreadyGiven = true;
        }
    };
    ImmutableInput.prototype.changeImmutable = function (instance, path, newValue) {
        var bits = path.split('.');
        var lastObject = newValue;
        var currentObject;
        var getLastObject = function () {
            var o = instance;
            for (var i = 0; i < bits.length; i++) {
                o = o[bits[i]];
            }
            return o;
        };
        while (bits.length) {
            var bit = bits.pop();
            currentObject = getLastObject();
            var fnName = "change" + string_1.firstUp(bit);
            if (currentObject[fnName]) {
                lastObject = currentObject[fnName](lastObject);
            }
            else {
                throw new Error('Unknow function : ' + fnName);
            }
        }
        return lastObject;
    };
    ImmutableInput.prototype.onChange = function (event) {
        var _a = this.props, path = _a.path, onChange = _a.onChange, instance = _a.instance, validator = _a.validator, onInvalid = _a.onInvalid;
        var newValue = event.target.value;
        var newInstance;
        var invalidValue;
        if (validator && !validator.test(newValue)) {
            newInstance = this.props.instance;
            invalidValue = newValue;
            if (onInvalid)
                onInvalid(newValue);
        }
        else {
            newInstance = this.changeImmutable(instance, path, newValue);
        }
        this.setState({ newInstance: newInstance, invalidValue: invalidValue });
        if (onChange)
            onChange(newInstance, invalidValue === undefined, path);
    };
    ImmutableInput.prototype.getValue = function (instance, path) {
        var value = instance;
        var bits = path.split('.');
        var bit;
        while (bit = bits.shift())
            value = value[bit];
        return value;
    };
    ImmutableInput.prototype.render = function () {
        var path = this.props.path;
        var _a = this.state, newInstance = _a.newInstance, invalidValue = _a.invalidValue;
        if (!path || !newInstance)
            return null;
        var value = this.getValue(newInstance, path);
        return React.createElement("input", {className: dom_1.classNames('immutable-input', { error: invalidValue !== undefined }), ref: 'me', type: "text", value: invalidValue !== undefined ? invalidValue : value, onChange: this.onChange.bind(this)});
    };
    return ImmutableInput;
}(React.Component));
exports.ImmutableInput = ImmutableInput;
