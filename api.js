// Default Url for our database and requred superagent
const base = 'https://mhw-db.com';
const { jar } = require('superagent');
const superagent = require('superagent');

// ---- Methods to aquire weapons from API ----

// Method to get all weapons
const getAllWeapons = async() => {
    try {
        const drawUrl =`${base}/weapons`;
        const res = superagent.get(drawUrl);
        return res;
    } catch (error) {
        console.log(error);
    }
};

//Method to get weapons by type
const getWeaponsByType =  async (args) => {
    try{
        // Even though none of the weapon types have a space within them and rely on '-',
        // .replace is used for convienence of user
        const drawUrl = `${base}/weapons?q={\"type\":\"${args.replace('-', ' ')}\"}`;
        const res = superagent.get(drawUrl);
        return res;    
    } catch (error){
        console.log(error);
    }
};

// Method to return a specific weapon via id
const getWeaponById = async (id) => {
    try {
        const drawUrl = `${base}/weapons/${id}`;
        const res = superagent.get(drawUrl);
        return res;
    } catch (error) {
        console.log(error);
    }
};

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
};

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
};

const getMonsterById = async (id) => {
    try{
        // get monster from api by it's specified id
        const drawUrl = `${base}/monsters/${id}`;
        const res = superagent.get(drawUrl);
        return res;
    } catch (error){
        console.log(error);
    }
};

// ---- Methods to aquire armor pieces from API ----

// Method to return all armor pieces
const getAllArmor = async() => {
    try {
        const drawUrl = `${base}/armor`;
        const res = superagent.get(drawUrl);
        return res;
    } catch(error) {
        console.log(error);
    }
};

// Method to search for armor pieces by rank
const getArmorByRank = async (args) => {
    try {
        const drawUrl = `${base}/armor?q={\"rank\":\"${args}\"}`;
        const res = superagent.get(drawUrl);
        return res;
    } catch(error) {
        console.log(error);
    }
};

// Method to return a specific armor piece via id
const getArmorById = async(id) => {
    try {
        const drawUrl = `${base}/armor/${id}`;
        const res = superagent.get(drawUrl);
        return res;
    } catch(error) {
        console.log(error);
    }
};

module.exports = {
    getAllMonsters,
    getMonsterBySpecies,
    getMonsterById,
    getAllWeapons,
    getWeaponsByType,
    getWeaponById,
    getAllArmor,
    getArmorByRank,
    getArmorById
};