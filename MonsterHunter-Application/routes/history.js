const router = require('express').Router();
const database = require('../db');

router.get('/', async (req, res) => {
    try{
        // grab optional query parameter
        const { query } = req;
        const { monsterSpecies } = query;

        // calls database to search for related history
        let results = {}
        results = await database.returnHistory('History', monsterSpecies);

        //displays results
        res.json(results);
    } catch (error) {
        res.status(500).json(error.toString());
    }
});

module.exports = router;