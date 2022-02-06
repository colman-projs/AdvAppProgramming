const commercials = require('../models/commercial')
const asyncWrapper = require('../middleware/async')

const create = (req, res) => {
    const commercials = new Commercial( {
        name: req.body.name,
        length: parseInt(req.body.length),
        rating: parseFloat(req.body.rating)
    })

    commercials.save().then(() =>{
        res.redirect('/commercial');    
    }).catch(error => {
        res.send('failed');
    })     
}

const get = (req, res) => {
    commercials.find().then(results => {
        console.log(results);
        res.json(results);
    });
}

const getAllcommercials = asyncWrapper(async (req, res) => {
    await commercials.find().then((commercials)=>{
        console.log(commercials);
        res.status(200).json({ commercials })
    }).catch(err=>{
        console.log(err)
    })
 
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