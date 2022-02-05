const Commercial = require('../models/commercial')
const asyncWrapper = require('../middleware/async')

const create = (req, res) => {
    const Commercial = new Commercial( {
        name: req.body.name,
        length: parseInt(req.body.length),
        rating: parseFloat(req.body.rating)
    })

    Commercial.save().then(() =>{
        res.redirect('/commercial');    
    }).catch(error => {
        res.send('failed');
    })     
}

const get = (req, res) => {
    Commercial.find().then(results => {
        console.log(results);
        res.json(results);
    });
}

const getAllcommercials = asyncWrapper(async (req, res) => {
    const commercials = await Commercial.find({})
    console.log(commercials);
    res.status(200).json({ commercials })
  })

const getByName = (req, res) => {
    Commercial.find({
        'name': {
            $regex: `.*${req.params.commercial.name}.*`
        }
    })
        .then(commercial => {
            res.json(commercial);
        })
}

const getById = (req, res) => {
    Commercial.findById(req.params.commercialId)
        .then(commercial => {
            res.json(commercial);
        })
}

const update = (req, res) => {
    res.send('Put entry point');
}

const remove = (req, res) => {
    res.send('Delete entry point');
}

module.exports = {create, get, getAllcommercials ,  getByName, update, remove, getById}