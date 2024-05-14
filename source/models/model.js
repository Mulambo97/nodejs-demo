// *************************************************************
// set up POST API into a Database - MongoDB, etc.
// *************************************************************
// this demo doesn't connect to a DB at the moment

import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { ObjectId } from 'mongodb';
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
  
  const insertPeopleInDB = async (people) => {

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
  
  };

  const getPeopleFromDB = async () => {
    try {
        await client.connect();
        const database = client.db("nodejsdemo");
        const collection = database.collection("people");
        const people = await collection.find({}).toArray();
        return people;
    } finally {
        await client.close();
    }
};

const deletePersonById = async (id) => {
  try {
      await client.connect();
      console.log("Connected to MongoDB!");

      const database = client.db("nodejsdemo");
      const collection = database.collection("people");
      const result = await collection.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 1) {
          console.log(`Successfully deleted person with ID ${id}`);
      } else {
          console.log(`No person found with ID ${id}`);
      }
  } catch (err) {
      console.error(`Error deleting person: ${err}`);
  } finally {
      await client.close();
  }
};

const updatePersonById = async (id, updateData) => {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const database = client.db("nodejsdemo");
        const collection = database.collection("people");
        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
        
        if (result.matchedCount === 1) {
            console.log(`Successfully updated person with ID ${id}`);
        } else {
            console.log(`No person found with ID ${id}`);
        }
    } catch (err) {
        console.error(`Error updating person: ${err}`);
    } finally {
        await client.close();
    }
};

export { insertPeopleInDB, getPeopleFromDB, deletePersonById, updatePersonById };