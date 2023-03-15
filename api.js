// Default Url for our database and requred superagent
const base = 'https://mhw-db.com';
const { jar } = require('superagent');
const superagent = require('superagent');

const getWeapons =  async (args) => {
    try{
        // Depending on which filter was called, uses if statement to properly search weapons
        if (args.weaponType) {
            // Even though none of the weapon types have a space within them and rely on '-',
            // .replace is used for convienence of user
            const drawUrl = `${base}/weapons?q={\"type\":\"${args.weaponType.replace('-', ' ')}\"}`;
            const res = await superagent.get(drawUrl);
            console.log(res.body);
        } else if (args.weaponRarity) {
            const drawUrl = `${base}/weapons?q={\"rarity\":${args.weaponRarity}}`;
            const res = await superagent.get(drawUrl);
            console.log(res.body);
        } else if (args.weaponID){
            const drawUrl = `${base}/weapons/${args.weaponID}`;
            const res = await superagent.get(drawUrl);
            console.log(res.body);
        }
    } catch (error){
        console.log(error);
    }
}

// Calls a weapon directly by using their id
// const selectWeapon = async (id) => {
// 	try{
// 		const drawUrl = `${base}/weapons/${id}`;
// 		const res = await superagent.get(drawUrl);
// 		console.log(res.body);
// 	} catch (error) {
// 		console.log(error);
// 	}

// }

// ---- Methods to get Monster stuff from API ----

// Method to get all the monsters
const getAllMonsters = async () => {

    try{
        const drawUrl = `${base}/monsters`;
        const res = superagent.get(drawUrl);
        return res;
    } catch (error){
        console.log(error);
    }
    // try{
    //     if(args.monsterSpecies){
            // if monster species paramter is selcted search for every monster of that species
            // use .replace('-', ' ') as the API can contain two word species yet the cli doesn't accept a space between therefore
            // to counter it we use the character '-' between the words
            const drawUrl = `${base}/monsters?q={\"species\":\"${args.monsterSpecies.replace('-', ' ')}\"}`;
    //         const res = await superagent.get(drawUrl);
    //         console.log(res.body);
}

// Method to get all the monsters based on selected species
const getMonsterBySpecies = async (args) => {
    try{
        // if monster species paramter is selcted search for every monster of that species
        // use .replace('-', ' ') as the API can contain two word species yet the cli doesn't accept a space between therefore
        // to counter it we use the character '-' between the words
        const drawUrl = `${base}/monsters?q={\"species\":\"${args.replace('-', ' ')}\"}`;
        const res = superagent.get(drawUrl);
        return res;
    } catch (error){
        console.log(error);
    }
}

const getMonsterById = async (id) => {
    try{
        // get monster from api by it's specified id
        const drawUrl = `${base}/monsters/${id}`;
        const res = superagent.get(drawUrl);
        return res;
    } catch (error){
        console.log(error);
    }
}

// ----

// Method to search for armor pieces via type or rank, or select an individual piece
const getArmor = async (args) => {
    try {
        if (args.armorType) {
            const drawUrl = `${base}/armor?q={\"type\":\"${args.armorType}\"}`
            const res = await superagent.get(drawUrl);
            console.log(res.body);
        } else if (args.armorRank) {
            const drawUrl = `${base}/armor?q={\"rank\":\"${args.armorRank}\"}`
            const res = await superagent.get(drawUrl);
            console.log(res.body);
        } else if (args.armorID){
            const drawUrl = `${base}/armor/${args.armorID}`;
            const res = await superagent.get(drawUrl);
            console.log(res.body);
        }
    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    getAllMonsters,
    getMonsterBySpecies,
    getMonsterById
};