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
                });
        },
        // handler
        (args) => {
            // returns the list of weapons
            app.getWeapons(args);
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
                    describe: 'returns monsters filtered by desired monster species. Use character - if there is a space with no caps.',
                    default: null,
                    type: 'string'
                });
        },
        // handler
        (args) => {
            app.getMonsters(args);
        }
    )

    .command(
        // Command and Description
        'getArmor', 'Searches for individual armor pieces based on type or rank.',
        // Builder
        (yargs) => {
            return yargs
                .option('armorRank', {
                    alias: 'ar',
                    describe: 'Returns all armor pieces based on rank.',
                    default: null,
                    type: 'string'
                });
        },
        // Handler
        (args) => {
            app.getArmor(args);
        }
    )
    .help().argv;
