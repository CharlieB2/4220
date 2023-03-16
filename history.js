const fs = require('fs');
const path = require('path');

const writeHistory = async (userSearch, searchResultsLength) => {
    try{
        const data = new Uint8Array(Buffer.from(JSON.stringify({search: userSearch, resultCount: searchResultsLength})));
        const fullPath = path.resolve(__dirname, './history.json');
        if(!fullPath){
            fs.writeFile('history.json', data, (error) => {
                if (error) throw error;
            });   
        } else {
            fs.appendFile('history.json', data, (error) => {
                if (error) throw error;
            });
        }
    }catch (error){
        console.log(error);
    }
}

module.exports = {
    writeHistory
};