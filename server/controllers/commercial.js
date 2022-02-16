const Commercials = require("../models/commercial");

const upsertCommercial = (req, res) => {
  const commercial = new Commercials({
    name: req.body.name,
  });

  commercial
    .save()
    .then(() => {
      res.redirect("/commercial");
      io.sockets.emit('updateClients');
    })
    .catch((err) => console.error(err));
};

const getCommercials = (_req, res) => {
  Commercials.find()
    .then((commercials) => {
      // console.log('GetAll: ', commercials);
      res.status(200).json(commercials);
    })
    .catch((err) => console.error(err));
};

const getCommercialsByScreenId = (req, res) => {
  const { screenId } = req.params;

  Commercials.find({ screenId })
    .then((commercials) => {
      //  console.log('commercials by screen: ', commercials);
      res.json(commercials);
    })
    .catch((err) => console.error(err));
};

const getCommercialById = (req, res) => {
  Commercials.findById(req.params.commercialId)
    .then((commercial) => {
      res.json(commercial);
    })
    .catch((err) => console.error(err));
};

const deleteCommercial = (req, res) => {
  res
    .deleteOne({ _id: req.params.commercialId })
    .then((deleteRes) => {
      res.json(deleteRes);
      io.sockets.emit('updateClients');
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
