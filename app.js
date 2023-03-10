const superagent = require('superagent');


// ----- TODO Week 08 - refactor this into api.js


const base = 'https://mhw-db.com';


Const getWeapon =  async (weaponType) => {
	Try{
		Const drawUrl = `${base}/weapons?q={‘type’ : ${weaponType}}`;
	      // Below is another possible option for searching weapon types
      // `${base}/weapons?q={“weapons.type”:${weaponType}}`;
		Const res = await superagent.get(drawurl);
            console.log(res);	
} catch (error){
      	console.log(error);
	}
}


Const selectWeapon = async (id) => {
	Try{
		Const drawUrl = ‘${base}/weapons/${id}’;
	      Const res = await superagent.get(drawUrl);
		console.log(res);
	} catch (error) {
		console.log(error)
}


}
