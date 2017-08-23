"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('./router.css');
var React = require('react');
var Route = (function (_super) {
    __extends(Route, _super);
    function Route() {
        _super.apply(this, arguments);
    }
    return Route;
}(React.Component));
exports.Route = Route;
var HASH_SEPARATOR = /\/+/;
var Router = (function (_super) {
    __extends(Router, _super);
    function Router() {
        _super.call(this);
        this.state = {};
    }
    Router.prototype.componentDidMount = function () {
        this.onHashChange(window.location.hash);
    };
    Router.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.props.hash !== nextProps.hash)
            this.onHashChange(nextProps.hash);
    };
    Router.prototype.parseHash = function (hash) {
        if (!hash)
            return [];
        if (hash.charAt(0) === '#')
            hash = hash.substr(1);
        var fragments = hash.split(HASH_SEPARATOR);
        if (fragments[0] === this.props.rootFragment)
            fragments.shift();
        return fragments.filter(Boolean);
    };
    Router.prototype.sanitizeHash = function (hash) {
        var rootFragment = this.props.rootFragment;
        var fragments = this.parseHash(hash);
        if (fragments.length === 0)
            return '#' + rootFragment;
        return "#" + rootFragment + "/" + fragments.join('/');
    };
    Router.prototype.replaceHash = function (newHash) {
        // Acts like window.location.hash = newHash but doesn't clutter the history
        // See http://stackoverflow.com/a/23924886/863119
        window.history.replaceState(undefined, undefined, newHash);
        this.onHashChange(newHash);
    };
    Router.prototype.hasExtraFragments = function (route) {
        return route.crumbs.length > route.fragment.split(HASH_SEPARATOR).length;
    };
    Router.prototype.stripUnnecessaryFragments = function (route, crumbs) {
        var rootFragment = this.props.rootFragment;
        var fragments = route.fragment.split(HASH_SEPARATOR);
        var parentFragment = crumbs.join('/').replace(route.crumbs.join('/'), '').replace(/\/$/, '');
        var strippedRouteCrumbs = route.crumbs.slice(0, route.fragment.split(HASH_SEPARATOR).length);
        var strippedCrumbs = [
            rootFragment,
            parentFragment,
            strippedRouteCrumbs.join('/')
        ].filter(Boolean);
        this.replaceHash('#' + strippedCrumbs.join('/'));
    };
    Router.prototype.onHashChange = function (hash) {
        var rootFragment = this.props.rootFragment;
        var safeHash = this.sanitizeHash(hash);
        if (hash !== safeHash) {
            this.replaceHash(safeHash);
            return;
        }
        var crumbs = this.parseHash(hash);
        var children = this.props.children;
        // Default route
        if (crumbs.length === 0) {
            var defaultFragment = this.getDefaultFragment(children);
            window.location.hash = hash + '/' + defaultFragment;
            return;
        }
        var route = this.getQualifiedRoute(children, crumbs);
        if (route.wasDefaultChoice) {
            crumbs.pop();
            crumbs.push(route.fragment);
            this.replaceHash('#' + [rootFragment].concat(crumbs).join('/'));
            return;
        }
        // Unnecessary fragments
        if (this.hasExtraFragments(route)) {
            this.stripUnnecessaryFragments(route, crumbs);
            return;
        }
        // Default child for this route
        if (this.canDefaultDeeper(route.fragment, route.crumbs)) {
            crumbs = crumbs.concat(this.getDefaultDeeperCrumbs(route.fragment, route.crumbs));
            this.replaceHash('#' + [rootFragment].concat(crumbs).join('/'));
        }
        if (this.props.onURLChange) {
            this.props.onURLChange(crumbs);
        }
        this.setState({ hash: window.location.hash });
    };
    Router.prototype.getDefaultDeeperCrumbs = function (fragment, crumbs) {
        var bits = fragment.split(HASH_SEPARATOR);
        bits.splice(0, crumbs.length);
        return bits.map(function (bit) { return bit.match(/^:[^=]+=(\w+)$/)[1]; });
    };
    Router.prototype.canDefaultDeeper = function (fragment, crumbs) {
        var bits = fragment.split(HASH_SEPARATOR);
        if (bits.length === crumbs.length)
            return false;
        bits.splice(0, crumbs.length);
        return bits.every(function (bit) { return /^:[^=]+=\w+$/.test(bit); });
    };
    Router.prototype.getDefaultFragment = function (children) {
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child.type === Route) {
                return child.props.fragment;
            }
        }
        return undefined;
    };
    Router.prototype.getQualifiedRoute = function (candidates, crumbs) {
        var isRoute = function (element) { return element.type === Route; };
        for (var i = 0; i < candidates.length; i++) {
            var candidate = candidates[i];
            var fragment_1 = candidate.props.fragment;
            if (!fragment_1)
                continue;
            if (crumbs[0] === fragment_1 || fragment_1.charAt(0) === ':') {
                if (!(candidate.props.children instanceof Array)) {
                    return { fragment: fragment_1, route: candidate, crumbs: crumbs };
                }
                else if (crumbs.length === 1) {
                    return { fragment: fragment_1, route: candidate, crumbs: crumbs };
                }
                else {
                    return this.getQualifiedRoute(candidate.props.children, crumbs.slice(1));
                }
            }
        }
        // If we are here, it means no route has been found and we should
        // return a default one.
        var route = candidates.filter(isRoute)[0];
        var fragment = route.props.fragment;
        return { fragment: fragment, route: route, crumbs: crumbs, wasDefaultChoice: true };
    };
    Router.prototype.isRoute = function (candidate) {
        if (!candidate)
            return false;
        return candidate.type === Route;
    };
    Router.prototype.isSimpleRoute = function (route) {
        if (!route)
            return false;
        return !(route.props.children instanceof Array);
    };
    Router.prototype.getDefaultRoute = function (route) {
        var _this = this;
        if (!route)
            return null;
        return route.props.children.filter(function (child) { return !_this.isRoute(child); })[0];
    };
    Router.prototype.getQualifiedChild = function (candidates, crumbs) {
        var fillProps = function (child, crumbs, fragment) {
            var newProps = {};
            fragment.split(HASH_SEPARATOR).forEach(function (bit, i) {
                if (bit.charAt(0) !== ':')
                    return;
                newProps[bit.slice(1).replace(/=.*$/, '')] = crumbs.shift();
            });
            return React.cloneElement(child, newProps);
        };
        var result = this.getQualifiedRoute(candidates, crumbs);
        if (this.isSimpleRoute(result.route)) {
            return fillProps(result.route.props.children, result.crumbs, result.fragment);
        }
        if (this.getDefaultRoute(result.route)) {
            return fillProps(this.getDefaultRoute(result.route), result.crumbs, result.fragment);
        }
        return null;
    };
    Router.prototype.render = function () {
        var children = this.props.children;
        var hash = this.state.hash;
        if (hash === undefined)
            return React.createElement("div", null); // returning null causes the tests to fail...
        var crumbs = this.parseHash(hash);
        if (!crumbs || !crumbs.length)
            return null;
        return this.getQualifiedChild(children, crumbs);
    };
    return Router;
}(React.Component));
exports.Router = Router;
