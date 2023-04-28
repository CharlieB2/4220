const router = require('express').Router();

//const database = require('../db');
const monsterHunterDB = require('MonsterHunter-API');

const _formatMonsters = (monsters) => {
    // format all monsters to display certain info
    return monsters.map((monster) => {
        return {
           id: monster.id,
           name: monster.name,
           type: monster.type,
           species: monster.species,
           description: monster.description         
        };
    });
};

router.get('/', async (req, res) =>{
    try{
        const { query } = req;
        const { species , metadata } = query;

        // if query has species search for all monsters by species
        // else grab every monster from the api
        if(species) {
            const monsterBySpecies = await monsterHunterDB.getMonsterBySpecies(species);
            const monsterBySpeciesFormatted = _formatMonsters(monsterBySpecies);
            res.json(monsterBySpeciesFormatted);
        } else {
            const allMonsters = await monsterHunterDB.getAllMonsters();
            const allMonstersFormatted = _formatMonsters(allMonsters);
            res.json(allMonstersFormatted);
        }
        
    } catch (error) {
        console.log(error);
    }
});

// get more info of specific monster by searching by id 
router.get('/:monsterId', async (req, res) => {
    try{
        const { params } = req;
        //const { metadata } = query;

        const { monsterId } = params;

        const monster = await monsterHunterDB.getMonsterById(monsterId);
        res.json(monster);
    } catch (error){
        console.log(error);
    }
});

module.exports = router;