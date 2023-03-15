const yargs = require('yargs/yargs');
const app = require('./app.js');

yargs(process.argv.slice(2))
    // $0 expands the name of the file
    // <> indicate the command is mandatory
    // [] indicate the command options are optional
    .usage('$0: Usage <command> [options]')
    .command(
	    // command and description
        'getWeapons', 'Used to get weapons from the game.',
        // builder
        (yargs) => {
            return yargs    
                .option('weaponType', {
                    alias: 'wt',
                    describe: 'returns a list of weapons that match the keyword',
                    default: null,
                    type: 'string'
                })
                .option('weaponRarity', {
                    alias: 'r',
                    describe: 'returns a list of weapons dependant on rarity',
                    default: null,
                    type: 'int'
                })
                .option('weaponID', {
                    alias: 'id',
                    describe: 'returns a single weapon based on their id',
                    default: null,
                    type: 'int'
                })
        },
        // handler
        (args) => {
            if (args.weaponType || args.weaponRarity || args.weaponID) {
                // returns the list of weapons
                app.getWeapons(args);
            } else {
                console.log('not a valid input');
            }
        }
    )

    .command(
        // command
        // <> indicate the command argument is mandatory
        'searchForMonsters',
        // description
        'Used to search through monsters from the video game. Having no optional parameters will return all the monsters available in the API.',
        // builder
        (yargs) => {
            return yargs    
                .option('monsterSpecies', {
                    alias: 'ms',
                    describe: 'returns monsters filtered by desired monster species',
                    default: null,
                    type: 'string'
                })
                .option('monsterType', {
                    alias: 'mt',
                    describe: 'returns monsters filtered by desired monster type',
                    default: null,
                    type: 'string'
                })
                .option('monsterID', {
                    alias: 'id',
                    describe: 'returns a single monster based on their id',
                    default: null,
                    type: 'int'
                })
        },
        // handler
        (args) => {
            if (args.monsterSpecies || args.monsterType || args.monsterID) {
                app.getMonsters(args);
            } else {
                console.log('not a valid input');
            }
        }
    )

    .command(
        // Command and Description
        'getArmor', 'Searches for individual armor pieces based on type or rank.',
        // Builder
        (yargs) => {
            return yargs
                .option('armorType', {
                    alias: 'ap',
                    describe: 'Returns all armor pieces based on type. (i.e. chest, head, etc.)',
                    default: null,
                    type: 'string'
                })
                .option('armorRank', {
                    alias: 'ar',
                    describe: 'Returns all armor pieces based on rank.',
                    default: null,
                    type: 'string'
                })
                .option('armorID', {
                    alias: 'id',
                    describe: 'returns a single armor piece based on their id',
                    default: null,
                    type: 'int'
                })
        },
        // Handler
        (args) => {
            if (args.armorType || args.armorRank || args.armorID) {
                app.getArmor(args);
            } else {
                console.log('not a valid input');
            }
        }
    )
    .help().argv;
