const router = require('express').Router();
let sequelize = require('../db');
const Log = sequelize.import('../models/log');
const validateSession = require('../middleware/validate-session');

router.get('/', (req,res) => {
    Log.findAll()
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({
            error:err
        }))
})

router.post('/', validateSession, (req, res) => {
    const logRequest = {
        description: req.body.description,
        definition: req.body.definition,
        results: req.body.results,
        owner: req.body.owner
    }

    Log.create(logRequest)
        .then(logs => res.statusMessage(200).json(logs))
        .catch(err => res.json(req.errors))
})

// router.get('/:name', (req,res) => {
//     Log.findOne({
//         where: {description: req.params.name}
//     })
//     .then(logs => res.status(200).json(logs))
//     .catch(err => res.status(500).json({
//         error:err
//     }))
// })

router.get('/:id', (req,res) => {
    Log.findOne({
        where: {id: req.params.id}
    })
    .then(logs => res.status(200).json(logs))
    // .catch(err => res.json(req.errors))
    .catch(err => res.status(500).json({
        error:err
    }))
})

router.put('/:id', (req, res) => {
    Log.update(req.body, {
        where: { id: req.params.id}})
        .then(logs => res.status(200).json(logs))
        .catch(err => res.json(req.errors))
})

router.delete('/:id', (req, res) => {
    Log.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(logs => res.sendStatus(200).json(logs))
    // .catch(err => res.json(req.errors))
    .catch(err => res.json({
        error: err
    }))
})

module.exports = router;