const commercials = require('../models/commercial');

const upsertCommercial = (req, res) => {
    const commercials = new Commercial({
        name: req.body.name,
    });

    commercials
        .save()
        .then(() => {
            res.redirect('/commercial');
        })
        .catch((err) => console.error(err));
};

const getCommercials = (_req, res) => {
    commercials
        .find()
        .then((commercials) => {
            console.log('GetAll: ', commercials);
            res.status(200).json(commercials);
        })
        .catch((err) => console.error(err));
};

const getCommercialsByScreenId = (req, res) => {
    const { screenId } = req.params;

    commercials
        .find({ screenId })
        .then((commercials) => {
            console.log('commercials by screen: ', commercials);
            res.json(commercials);
        })
        .catch((err) => console.error(err));
};

const getCommercialById = (req, res) => {
    commercials
        .findById(req.params.commercialId)
        .then((commercial) => {
            res.json(commercial);
        })
        .catch((err) => console.error(err));
};

const deleteCommercial = (req, res) => {
    res.deleteOne({ _id: req.params.commercialId })
        .then((deleteRes) => {
            res.json(deleteRes);
        })
        .catch((err) => console.error(err));
};

module.exports = {
    getCommercials,
    getCommercialsByScreenId,
    upsertCommercial,
    getCommercialById,
    deleteCommercial,
};
