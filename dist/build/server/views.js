"use strict";
function favicon(options) {
    var version = options.version, title = options.title;
    return "\n<link rel=\"apple-touch-icon\" sizes=\"57x57\" href=\"favicon/apple-touch-icon-57x57.png?v=" + version + "\">\n<link rel=\"apple-touch-icon\" sizes=\"60x60\" href=\"favicon/apple-touch-icon-60x60.png?v=" + version + "\">\n<link rel=\"apple-touch-icon\" sizes=\"72x72\" href=\"favicon/apple-touch-icon-72x72.png?v=" + version + "\">\n<link rel=\"apple-touch-icon\" sizes=\"76x76\" href=\"favicon/apple-touch-icon-76x76.png?v=" + version + "\">\n<link rel=\"apple-touch-icon\" sizes=\"114x114\" href=\"favicon/apple-touch-icon-114x114.png?v=" + version + "\">\n<link rel=\"apple-touch-icon\" sizes=\"120x120\" href=\"favicon/apple-touch-icon-120x120.png?v=" + version + "\">\n<link rel=\"apple-touch-icon\" sizes=\"144x144\" href=\"favicon/apple-touch-icon-144x144.png?v=" + version + "\">\n<link rel=\"apple-touch-icon\" sizes=\"152x152\" href=\"favicon/apple-touch-icon-152x152.png?v=" + version + "\">\n<link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"favicon/apple-touch-icon-180x180.png?v=" + version + "\">\n<link rel=\"icon\" type=\"image/png\" href=\"favicon/favicon-32x32.png?v=" + version + "\" sizes=\"32x32\">\n<link rel=\"icon\" type=\"image/png\" href=\"favicon/android-chrome-192x192.png?v=" + version + "\" sizes=\"192x192\">\n<link rel=\"icon\" type=\"image/png\" href=\"favicon/favicon-96x96.png?v=" + version + "\" sizes=\"96x96\">\n<link rel=\"icon\" type=\"image/png\" href=\"favicon/favicon-16x16.png?v=" + version + "\" sizes=\"16x16\">\n<link rel=\"manifest\" href=\"favicon/manifest.json?v=" + version + "\">\n<link rel=\"mask-icon\" href=\"favicon/safari-pinned-tab.svg?v=" + version + "\" color=\"#5bbad5\">\n<link rel=\"shortcut icon\" href=\"favicon/favicon.ico?v=" + version + "\">\n<meta name=\"apple-mobile-web-app-title\" content=\"" + title + "\">\n<meta name=\"application-name\" content=\"" + title + "\">\n<meta name=\"msapplication-TileColor\" content=\"#0093E2\">\n<meta name=\"msapplication-TileImage\" content=\"favicon/mstile-144x144.png?v=" + version + "\">\n<meta name=\"msapplication-config\" content=\"favicon/browserconfig.xml?v=" + version + "\">\n<meta name=\"theme-color\" content=\"#ffffff\">\n";
}
function layout(options, content) {
    return "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"description\" content=\"Data Explorer\">\n  <meta name=\"author\" content=\"Imply\">\n  <meta name=\"google\" value=\"notranslate\">\n  " + favicon(options) + "\n  <meta name=\"viewport\" content=\"width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1\">\n  <title>" + options.title + "</title>\n</head>\n<body>\n" + content + "\n</body>\n</html>\n";
}
exports.layout = layout;
function pivotLayout(options) {
    var version = options.version, user = options.user, appSettings = options.appSettings, readOnly = options.readOnly;
    return layout(options, "<div class=\"app-container\"></div>\n<script>var __CONFIG__ = " + JSON.stringify({ version: version, user: user, appSettings: appSettings, readOnly: readOnly }) + ";</script>\n<script charset=\"UTF-8\" src=\"pivot.js?v=" + version + "\"></script>");
}
exports.pivotLayout = pivotLayout;
function errorLayout(options, message, error) {
    if (error === void 0) { error = {}; }
    return layout(options, "<h1>{{message}}</h1>\n<h2>{{error.status}}</h2>\n<pre>{{error.stack}}</pre>");
}
exports.errorLayout = errorLayout;
