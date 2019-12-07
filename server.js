
const restify = require('restify');
const route = require('./api/route/route');
const queries = require('./api/util/queries');

const server = restify.createServer();
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.authorizationParser());
server.use((req, res, next)=>{
    queries.createQuery('users', {username: req.username}).then(res=>{        
        if (!res || res.password !== req.authorization.basic.password) {
            res.send(401, 'Unauthorized');
            return next(false);
        }
        return next();
    }).catch(err=> {
        console.log('auth error');
        console.log(err);
        return next(err); 
    })
    
});
route.route(server);

const port = process.env.PORT || 8080;
server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
});
