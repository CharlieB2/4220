const router = require('express').Router();

const database = require('../db');
const monsterHunterDB = require('MonsterHunter-API');

const _formatMonsters = (monsters) => {
    return monsters.map((monster) => {
        return {
            display: monster.name,
            id: monster.id
        }
    })
}

router.get('/', async (req, res) => {
    try{
        // grab query paramter (monsterSpecies)
        const { query } = req;
        const { monsterSpecies } = query;

        // initialize object
        let monsters = {};

        // if the user puts 'all' in the monsterSpecies parameter it means they want to see all the monsters in the api
        // else it will return the monsters of the requested species
        if(monsterSpecies === 'all'){
            monsters = await monsterHunterDB.getAllMonsters();
        } else {
            monsters = await monsterHunterDB.getMonsterBySpecies(monsterSpecies);
        }

        // format to show the name and id of the monster
        monsters = _formatMonsters(monsters);
        
        const results = {
            searchTerm: monsterSpecies,
            results: monsters
        };
        
        
        res.json(results); // display monsters to user


        database.save('History', results);
    } catch (error){
        res.status(500).json(error.toString());
    }
});

module.exports = router;