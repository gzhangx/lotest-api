
const session = require('cookie-session');
const passport = require('passport-restify');
const LocalStrategy = require('passport-local').Strategy;
const CookieParser = require('restify-cookies');

const queries = require('./queries');


passport.use(new LocalStrategy(
    function(username, password, done) {
        queries.createQuery('users', {username}).then(found=>{        
            if (!found || found.password !== password) {
                return done(null, false); 
            }
            return done(null, found);
        }).catch(err=> {
            console.log('auth error');
            console.log(err);
            return next(err); 
        })      
    }
  ));

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    queries.createQuery('users', {uuid:user.uuid}).then(found=>{                
        return done(null, found);         
    }).catch(err=> {
        console.log('auth error');
        console.log(err);
        return done(err); 
    })  
    //User.findById(id, function (err, user) {
    //  done(err, user);
    //});
  });

function oldAuth(server) {
server.use((req, res, next)=>{
    queries.createQuery('users', {username: req.username}).then(found=>{        
        if (!found || found.password !== req.authorization.basic.password) {
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
}

function initPassport(server) {
      
    server.use(CookieParser.parse);
    server.use(session({
	    keys: ['key1xxx', 'key2xxxxx'],
	    maxage: 48 * 3600 /*hours*/ * 1000,  /*in milliseconds*/
	    secureProxy: false // if you do SSL outside of node
    }));
    
    server.use(passport.initialize());
    server.use(passport.session());

    server.post('/login', 
        passport.authenticate('local', { failureRedirect: '/login' }),
        function(req, res) {            
            res.redirect('/', (a1,a2)=>{
                console.log(a1);
                console.log(a2);
            });
        });
}

module.exports = {
    initPassport,
};