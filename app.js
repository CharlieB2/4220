const superagent = require('superagent');

// Default Url for our database
const base = 'https://mhw-db.com';

const getWeapon =  async (weaponType) => {
	try{
		const drawUrl = `${base}/weapons?q={"type" : ${weaponType}}`;
		// Below is another possible option for searching weapon types
		// `${base}/weapons?q={“weapons.type”:${weaponType}}`;
		const res = await superagent.get(drawUrl);
		console.log(res);	
	} catch (error){
      		console.log(error);
	}
}

const selectWeapon = async (id) => {
	try{
		const drawUrl = `${base}/weapons/${id}`;
		const res = await superagent.get(drawUrl);
		console.log(res);
	} catch (error) {
		console.log(error);
	}

}


// Main method to start the searchForMonsters command
const getMonsters = async (args) => {
	try{	
		if(args.monsterSpecies){
			// if monster species paramter is selcted search for every monster of that species
			// use .replace('-', ' ') as the API can contain two word species yet the cli doesn't accept a space between therefore
			// to counter it we use the character '-' between the words
			const drawUrl = `${base}/monsters?q={\"species\":\"${args.monsterSpecies.replace('-', ' ')}\"}`
			const res = await superagent.get(drawUrl);
			console.log(res.body);
		}
	} catch (error) {
		console.log(error);
	}
}

// Exports
module.exports = {
	getMonsters
};
