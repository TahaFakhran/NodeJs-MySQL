const express = require('express');
const router = express.Router();
const warehouses = require('../services/warehouses');

/* GET warehouses listing. */
router.get('/', async function (req, res, next) {
    try {
        res.json(await warehouses.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting warehouses `, err.message);
        next(err);
    }
});

/* GET warehouse  */
router.get('/:id', async function (req, res, next) {
    try {
        res.json(await warehouses.getSingle(req.params.id));
    } catch (err) {
        console.error(`Error while getting warehouse `, err.message);
        next(err);
    }
});

/* POST create warehouse */
router.post('/', async function (req, res, next) {
    try {
        res.json(await warehouses.create(req.body));
    } catch (err) {
        console.error(`Error while creating warehouse `, err.message);
        next(err);
    }
});

/* PUT update warehouse */
router.put('/:id', async function (req, res, next) {
    try {
        res.json(await warehouses.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating warehouse`, err.message);
        next(err);
    }
});

/* DELETE warehouse */
router.delete('/:id', async function (req, res, next) {
    try {
        res.json(await warehouses.remove(req.params.id));
    } catch (err) {
        console.error(`Error while deleting warehouse`, err.message);
        next(err);
    }
});

module.exports = router;