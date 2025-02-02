const LocalStrategy = require('passport-local');
const User = require('../models/user');

module.exports = (passport) => {
    passport.serializeUser((user, cb) => {
        return cb(null, user._id)
    });

    passport.deserializeUser((id, cb) => {
        User
            .findById(id)
            .then((user) => cb(null, user))
            .catch((error) => cb(err, {}));
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, username, password, cb) => {
        User
            .findOne({ username: username })
            .then((userExist) => {
                if (!userExist) {
                    const user = new User(req.body);
    
                    user.password = user.genHash(user.password);
                    
                    return user
                            .save()
                            .then((user) => {
                                return cb(null, user)
                            })
                            .catch((error) => {
                                console.log(error);
                                return;
                            });
                }

                return cb(null, false);
            })
            .catch((error) => {
                return cb(err, false);
            } )
    }));

    passport.use('local-signin', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, username, password, cb) => {
        User
            .findOne({ username })
            .then((user) => {
                if (!user) {
                    console.log('usuário não encontrado');
                    return cb(null, false);
                }
                
                user.validatePassword(password, user.password, (err, result) => {
                    if (!result || err) {
                        console.log('senha incorreta ' + err + ' ' + result);
                        return cb(null, false);
                    }
                    return cb(null, user);
                });

                /*
                if (!user.validatePassword(password, user.password)) {
                    console.log('senha incorreta ' + err + ' ' + result);
                    return cb(null, false);
                }*/

                return cb(null, user);

            })
            .catch((error) => console.log(error));
    }
    ));

}