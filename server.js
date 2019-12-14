
const restify = require('restify');
const route = require('./api/route/route');
const patuh = require('./api/util/pauth');
const fs = require('fs');

const HTTPS = true;
const serverHttpsOpt = {
    key: fs.readFileSync('./key.pem'),
    certificate: fs.readFileSync('./server.crt')
};
const server = restify.createServer(HTTPS?serverHttpsOpt:null);
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.authorizationParser());
server.use(restify.plugins.requestLogger());

route.route(server);

patuh.initPassport(server);

const port = process.env.PORT || (HTTPS?443:8080);
server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
});
