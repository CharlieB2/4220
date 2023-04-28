const router = require('express').Router();

//const database = require('../db');
const monsterHunterDB = require('MonsterHunter-API');

const _formatArmors = (armors) => {
    return armors.map((armor) => {
        return {
            id: armor.id,
            name: armor.name,
            type: armor.type,
            rank: armor.rank,
            rarity: armor.rarity
        };
    });
}

router.get('/', async(req, res) => {
    try {
        const { query } = req;
        const { armorRank , metadata } = query;

        if(armorRank){
            const armorByRank = await monsterHunterDB.getArmorByRank(armorRank);
            const armorByRankFormatted = _formatArmors(armorByRank);
            res.json(armorByRankFormatted);
        } else {
            const allArmors = await monsterHunterDB.getAllArmor();
            const allArmorsFormatted = _formatArmors(allArmors);
            res.json(allArmorsFormatted);
        }
    } catch (error) {
        console.log(error);
    }
});

router.get('/:armorId', async (req, res) => {
    try {
        const { params } = req;
        //const { metadata } = query;

        const { armorId } = params;

        const armor = await monsterHunterDB.getArmorById(armorId);
        res.json(armor);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;