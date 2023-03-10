const yargs = require('yargs/yargs');
const app = require('./app.js');

yargs(process.argv.slice(2))
    // $0 expands the name of the file
    // <> indicate the command is mandatory
    // [] indicate the command options are optional
    .usage('$0: Usage <command> [options]')
    .command(
	    // command
        // <> indicate the command argument is mandatory
        'getweapons',
        // description
        'Used to get weapons from the game',
        // builder
        (yargs) => {
            return yargs    
                .option('weapontype', {
                    alias: 'wt',
                    describe: 'returns a list of weapons that match the keyword',
                    default: null,
                    type: 'string'
                });
        },
        // handler
        (args) => {
            if (args.id === string) {
                // returns a list of weapons

		// app.getWeapons()
                app.playPoker(args);
            } else {
                console.log("not a valid input");
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
                });
        },
        // handler
        (args) => {
            if (args.monsterSpecies) {
                app.getMonsters(args);
            } else {
                console.log("not a valid input");
            }
        }
    )
    .help().argv;
