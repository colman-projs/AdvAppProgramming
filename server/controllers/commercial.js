const Commercial = require('../models/commercial');
const errorHandler = require('../globals').errorHandler;

const upsertCommercial = (req, res) => {
    const commercial = new Commercial(req.body);

    commercial
        .save()
        .then(() => {
            res.redirect('/commercial');
        })
        .catch(errorHandler(res));
};

const getCommercials = (_req, res) => {
    Commercial.find()
        .then((commercials) => {
            res.json(commercials);
        })
        .catch(errorHandler(res));
};

const getCommercialsByScreenId = (req, res) => {
    const { screenId } = req.params;

    Commercial.find({ screenId })
        .then((commercials) => {
            res.json(commercials);
        })
        .catch(errorHandler(res));
};

const getCommercialById = (req, res) => {
    Commercial.findById(req.params.commercialId)
        .then((commercial) => {
            res.json(commercial);
        })
        .catch(errorHandler(res));
};

const deleteCommercial = (req, res) => {
    Commercial.deleteOne({ _id: req.params.commercialId })
        .then((deleteRes) => {
            res.json(deleteRes);
        })
        .catch(errorHandler(res));
};

module.exports = {
    getCommercials,
    getCommercialsByScreenId,
    upsertCommercial,
    getCommercialById,
    deleteCommercial,
};
