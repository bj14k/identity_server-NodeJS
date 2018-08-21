const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');


module.exports.register = (req, res, next) => {
    var user = new User();
    user.userName = req.body.userName;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save((err, doc) => {
        if (err) {
            if (err.code === 11000) {
                res.status(422).send('Duplicate email adress found.');
            } else {
                next(err);
            }
        } else {
            console.log(`User ${doc._id} registred.`);
            res.status(200).send({ registred: true });
        }
    })
}

module.exports.authenticate = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(400).json(err);
        } else if (user) {
            return res.status(200).json({ 'token': user.generateJWT() });
        } else {
            return res.status(404).json(info);
        }
    })(req, res);
}

module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req._id }, (err, user) => {
        if (!user) {
            return res.status(404).send({ status: false, message: 'User record not found.' });
        } else {
            return res.status(200).send({ status: true, user: _.pick(user, ['userName', 'email']) });
        }
    });
}