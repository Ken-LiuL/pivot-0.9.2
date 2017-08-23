require.extensions['.css'] = function (module, filename) { };
require.extensions['.svg'] = function (module, filename) {
    module.exports = '<svg viewBox="0 0 16 16"><rect width=16 height=16 fill="red"></rect></svg>';
};
