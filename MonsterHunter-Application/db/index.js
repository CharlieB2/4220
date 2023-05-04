const { MongoClient } = require('mongodb');

const config = require('../config.json');

const mongo = () => {
    const mongoUrl = `mongodb+srv://${config.username}:${config.password}@4220.icu4hfk.mongodb.net/${config.db_name}?retryWrites=true&w=majority`;
    let db = null;

    async function connect () {
        try{
            const client = new MongoClient(mongoUrl);
            await client.connect();

            db = client.db();

            console.log('connected to mongoDB');
        } catch (error){
            console.log(error)
        }
    }

    async function _doesExist (collection, searchTerm){
        try {
            return await collection.find({searchTerm}).next();
        } catch (error){
            console.log(error);
        }

    }

    async function save (collectionName, data){
        try{
            // grab collection and check if searchTerm exists in the database;
            const collection = db.collection(collectionName);

            // if search term exists in the database, just update the recently searched
            if(await collection.find({searchTerm: data.searchTerm}).next()){
                await collection.updateOne({searchTerm: data.searchTerm}, {$set: {lastSearched: new Date()}});
            } else {
                await collection.insertOne({
                    searchTerm: data.searchTerm,
                    resultCount: Object.keys(data.results).length,
                    lastSearched: new Date()
                });
            }
        } catch (error){
            console.log(error);
        }
    }

    return{
        connect,
        save
    };
};

module.exports = mongo();