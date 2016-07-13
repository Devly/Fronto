var elixir = require('laravel-elixir');
var path = require('path');
var http = require('http');
var paperboy = require('paperboy');
var open = require("open");
var argv = require("yargs").argv;

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function (mix) {
    mix.sass('app.scss');
    mix.babel('*.js');
    //mix.browserSync();
    mix.version(['css/app.css', 'js/all.js']);
});

// Reserve localhost:8080 to load files
if (argv.server) {
    var webroot = path.join('public'),
        port = 8080;
    http.createServer(function (req, res) {
        var ip = req.connection.remoteAddress;

        paperboy
            .deliver(webroot, req, res)
            .addHeader('X-Powered-By', ':D')
            .before(function () {
                //console.log('Request received for ' + req.url);
            })
            .after(function (statusCode) {
                if (statusCode != 200 && statusCode != 304) {
                    console.log(statusCode + ' - ' + req.url + ' ' + ip);
                }
            })
            .error(function (statusCode, msg) {
                console.log([statusCode, msg, req.url, ip].join(' '));
                res.writeHead(statusCode, {'Content-Type': 'text/plain'});
                res.end('Error [' + statusCode + ']');
            })
            .otherwise(function (err) {
                console.log([404, err, req.url, ip].join(' '));
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('Error 404: File not found');
            });
    }).listen(port);

    open('http://localhost:8080');
}
