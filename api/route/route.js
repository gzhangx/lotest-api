const keys = require('lodash/keys');

const routes = require('./routes').routes;
const patuh = require('../util/pauth');
const restify = require('restify');

module.exports = {
    route: server=>{
        const rts = keys(routes);
        rts.forEach(url=>{
            const op = routes[url];
            server[op.method](url, op.func);
        });

        patuh.initPassport(server);
        server.use((req, res, next)=>{
            const controller = routes[req.url];
            if (controller && controller.auth) {
                if (!req.user) {
                    res.send(401, 'Unauthorized');
                    return next(false);
                }
            }
            return next(); 
        }); 

        server.get('/*', restify.plugins.serveStatic({
            directory: `${__dirname}/../../build`,
            default: 'index.html'
          }))
    }
};