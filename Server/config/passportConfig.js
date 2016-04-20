

module.exports = function(config){
    config.passport.use(new config.localStrategy(function (userName, password, done){
        User.findOne({userName:userName}).exec(function(err, user){
            console.log('------------------------------------------------------------------');
            if(user){
                return done(null, user);
            }else{
                return done(null, false)
            }
        })
    }));
config.passport.serializeUser(function(user, done){
    if(user){
        done(null, user._id);
    }
});

config.passport.deserializeUser(function(id, done){
    User.findOne({_id:id}).exec(function(err, user){
        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    })
});

}