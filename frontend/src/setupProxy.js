const { createProxyMiddleware } = require('http-proxy-middleware');
const Agent = require('agentkeepalive');



module.exports = function (app) {

    const keepaliveAgent = new Agent({
        maxSockets: 100,
        keepAlive: true,
        maxFreeSockets: 1, // the usual setting of 10 can cause issues with the authentication, but 1 is worse on performance
        keepAliveMsecs: 1000,
        timeout: 999999,
        keepAliveTimeout: 30000, // free socket keepalive for 30 seconds
        freeSocketTimeout: 30000
    });

    const appProxy = createProxyMiddleware(
        "/api",
        {
            target: 'http://localhost:5147', // IIS express http port
            secure: false,
            changeOrigin: true,
            agent: keepaliveAgent,
            onProxyRes: function (proxyRes, req, res) {
                //proxyRes.headers['Access-Control-Allow-Origin'] = '*';
                var key = 'www-authenticate'
                proxyRes.headers[key] = proxyRes.headers[key] && proxyRes.headers[key].split(',')
            },
        }
    );

    app.use(appProxy);
};