const { createProxyMiddleware } = require('http-proxy-middleware');
const Agent = require('agentkeepalive');



module.exports = function (app) {

    const keepaliveAgent = new Agent({
        maxSockets: 100,
        keepAlive: true,
        maxFreeSockets: 10,
        maxSockets: 1,
        keepAliveMsecs: 1000,
        timeout: 999999,
        keepAliveTimeout: 30000 // free socket keepalive for 30 seconds
    });

    const appProxy = createProxyMiddleware(
        "/api",
        {
           
            target: 'https://localhost:44348',
            secure: false,
            changeOrigin: true,
            //agent: keepaliveAgent,
            onProxyRes: function (proxyRes, req, res) {
                //proxyRes.headers['Access-Control-Allow-Origin'] = '*';
                var key = 'www-authenticate'
                proxyRes.headers[key] = proxyRes.headers[key] && proxyRes.headers[key].split(',')
            },
        }
    );

    app.use(appProxy);
};



//var proxyMiddleware = require("http-proxy-middleware");

//var onProxyRes = function (proxyRes, req, res) {
//    var key = 'www-authenticate';
//    proxyRes.headers[key] = proxyRes.headers[key] && proxyRes.headers[key].split(',');
//};

//var options = {
//    target: 'API_HOST',
//    logLevel: 'debug',
//    auth: 'LOGIN:PASS',
//    agent: keepaliveAgent,
//    onProxyRes: onProxyRes
//};

//var proxy = proxyMiddleware('/api', options);