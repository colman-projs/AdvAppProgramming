const Commercial = require('../models/commercial');
const errorHandler = require('../globals').errorHandler;

const defaultCommercials = require('../commercials');

const upsertCommercial = (req, res) => {
    Commercial.findOneAndUpdate({ _id: req.body._id }, req.body, {
        new: true,
        upsert: true,
    })
        .then(() => {
            res.send(true);
        })
        .catch(errorHandler(res));
};

const getCommercials = (_req, res) => {
    Commercial.find()
        .then(commercials => {
            res.json(commercials);
        })
        .catch(errorHandler(res));
};

const getCommercialsByScreenId = (req, res) => {
    const { screenId } = req.params;

    Commercial.find({ screenId })
        .then(commercials => {
            res.json(commercials);
        })
        .catch(errorHandler(res));
};

const getCommercialById = (req, res) => {
    Commercial.findById(req.params.commercialId)
        .then(commercial => {
            res.json(commercial);
        })
        .catch(errorHandler(res));
};

const deleteCommercial = (req, res) => {
    Commercial.deleteOne({ _id: req.params.commercialId })
        .then(deleteRes => {
            res.json(deleteRes);
        })
        .catch(errorHandler(res));
};

const resetCommercials = async () => {
    console.log('Reseting DB...');
    await Commercial.deleteMany();
    await Commercial.create(defaultCommercials);
};

module.exports = {
    getCommercials,
    getCommercialsByScreenId,
    upsertCommercial,
    getCommercialById,
    deleteCommercial,
    resetCommercials,
};
