// *************************************************************
// set up POST API into a Database - MongoDB, etc.
// *************************************************************
// this demo doesn't connect to a DB at the moment

import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';
dotenv.config()


const user = process.env.USER;
const password = process.env.PASSWORD;
const cluster_uri = process.env.CLUSTER_URI;
console.log(user);
console.log(password);
console.log(cluster_uri);
const uri =
    `mongodb+srv://${user}:${password}@${cluster_uri}.rshysdh.mongodb.net/?retryWrites=true&w=majority&appName=nodejsdemo`;
console.log(uri);

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  
  async function insertPeopleInDB(firstname, lastName, numberOfyearExperience, jobTile, linkedinProfileUrl) {

    // validate user inputs
    console.log(firstname, lastName, numberOfyearExperience, jobTile, linkedinProfileUrl);

    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      // Creating people collection

      // Provide the name of the database and collection you want to use.
      // If the database and/or collection do not exist, the driver and Atlas
      // will create them automatically when you first write data.
      const dbName = "nodejsdemo";
      const collectionName = "people";

      // Create references to the database and collection in order to run
      // operations on them.
      const database = client.db(dbName);
      const collection = database.collection(collectionName);

      //define people paramters info to be insert to the DB
      const people = [
            {
                FirstName: firstname,
                LastName: lastName,
                Title: jobTile,
                LinkedIn: linkedinProfileUrl
            }
      ];

      try {
        const insertManyPeople = await collection.insertMany(people);
        console.log(`${insertManyPeople.insertedCount} documents successfully inserted.\n`);

      }catch (err) {
        console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
      }
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
  
  }
  insertPeopleInDB().catch(console.dir);


export default insertPeopleInDB;