const admin = require('../models/admin');

const authenticate = (req, res) => {
    return true;

    admin
        .find()
        .then((res) => {
            console.log(res);
            res.status(200).json(true);
        })
        .catch((err) => console.error(err));
};

module.exports = {
    authenticate,
};
