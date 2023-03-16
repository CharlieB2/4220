const prompts = require('prompts');
const api = require('./api.js');
const history = require('./history.js');


// Method to that handles getting the monsters logic

// TODO: figure out how to get all monster names in the list

const _selectMonsters = async (monsters) => {
    // create an array which contains just the names of all the monsters for the prompts
    const displayMonsters = monsters.map(monster => {
        // set the monster name and the value to the monster id specified by the API
        return {title: `${monster.name}`, value: monster.id}
    });

    return await prompts([
        {
            type: 'select',
            name: 'monster',
            message: 'Pick a monster you would like more info of',
            choices: displayMonsters
        }
    ]);
}

const getMonsters = async (args) => {
    try{
        // If the user didn't specify a species, just get a list of all the monsters
        if(!args.monsterSpecies){
            // get list of all monsters from api
            const monsters = await api.getAllMonsters();
            // grab the body which contains the monsters
            const monsterNames = monsters.body;

            // call the method to allow the user to select which monster they want more info of
            const selectMonster = await _selectMonsters(monsterNames);

            // get info of the selected monster
            const getMonsterInfo = await api.getMonsterById(selectMonster.monster);
            // grab info from body
            const monsterInfo = getMonsterInfo.body;

            // send what the user searched and the size of the results to history file
            // send command that was sent and the json containing all the monsters
            sendHistory(args._[0], monsterNames);

            // display info to user in a clean way
            console.log(`Monster: ${monsterInfo.name} \nType: ${monsterInfo.type} \nSpecies: ${monsterInfo.species} \nDescription: ${monsterInfo.description}`);

        } else {
            // else if user inputted a species, get all the monsters of that species

            const monstersBySpecies = await api.getMonsterBySpecies(args.monsterSpecies);
            const monsterNames = monstersBySpecies.body;

            const selectMonster = await _selectMonsters(monsterNames);

            const getMonsterInfo = await api.getMonsterById(selectMonster.monster);
            const monsterInfo = getMonsterInfo.body;

            // since the user searched by species, add the species they selected into the search
            const searchParameter = `${args._[0]} ${args.monsterSpecies}`;
            sendHistory(searchParameter, monsterNames);

            console.log(`Monster: ${monsterInfo.name} \nType: ${monsterInfo.type} \nSpecies: ${monsterInfo.species} \nDescription: ${monsterInfo.description}`);
        }
    } catch (error) {
        console.log(error);
    }
}

const sendHistory = async (searchParameter, resultLength) => {
    try{
        // get length of results by getting ids
        const searchResultsLength = (Object.keys(resultLength)).length;
        const userSearch = `${searchParameter}`;

        // call the writeHistroy method to write onto file
        await history.writeHistory(userSearch, searchResultsLength);
    } catch (error){
        console.log(error)
    }
}

module.exports = {
    getMonsters
};