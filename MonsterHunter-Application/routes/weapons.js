const router = require('express').Router();

//const database = require('../db');
const monsterHunterDB = require('MonsterHunter-API');

const _formatWeapons = (weapons) => {
    // format all weapons to display certain info
    return weapons.map((weapon) => {
        return{
            id: weapon.id,
            name: weapon.name,
            type: weapon.type,
            rarity: weapon.rarity
        };
    });
};

router.get('/', async (req, res) => {
    try{
        const { query } = req;
        const { weaponType, metadata } = query;

        if(weaponType){
            const weaponsByType = await monsterHunterDB.getWeaponsByType(weaponType);
            const weaponsByTypeFormatted = _formatWeapons(weaponsByType);
            res.json(weaponsByTypeFormatted);
        } else {
            const allWeapons = await monsterHunterDB.getAllWeapons();
            const allWeaponsFormatted = _formatWeapons(allWeapons);
            res.json(allWeaponsFormatted);
        }
    } catch (error){
        console.log(error);
    }
});

router.get('/:weaponId', async (req, res) => {
    try {
        const { params } = req;
        //const { metadata } = query;

        const { weaponId } = params;

        const weapon = await monsterHunterDB.getWeaponById(weaponId);
        res.json(weapon);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;