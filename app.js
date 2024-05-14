import express from 'express';
import routes from './source/routes/route.js';
import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { insertPeopleInDB, deletePersonById, updatePersonById } from './source/models/model.js';

dotenv.config();
// variable
const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

//body parses
//create Javascrip array from req parses
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Application routes
// connect our application to Express app

/** 
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
**/
  /*** 
  // opening connection to db
  async function openDbConnection (){
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch(err){
      console.log(err);
    }
  }openDbConnection().catch(console.dir);

  //Closing db connection
  async function closeDbConnection(){
    try {
      await client.close();
      console.log("Pinged your deployment. You successfully disconnected to MongoDB!")
    } catch(err){
      console.log(err);
    }
  } closeDbConnection().catch(console.dir);
***/

// Predefined list of people to insert
const predefinedPeople = [
  {
      "firstName": "Yann",
      "lastName": "Mulonda",
      "jobTitle": "Software Engineer",
      "numberOfYearExperience": 5,
      "linkedinProfileUrl": "https://www.linkedin.com/in/yannmjl/"
  },
  {
      "firstName": "Odon",
      "lastName": "Mulambo",
      "jobTitle": "Software Engineer",
      "numberOfYearExperience": 4,
      "linkedinProfileUrl": "https://www.linkedin.com/in/bernard-ngandu/"
  },
  {
      "firstName": "Michael",
      "lastName": "Neis",
      "jobTitle": "Web Developer",
      "numberOfYearExperience": 3,
      "linkedinProfileUrl": "https://www.linkedin.com/in/clerc-ngonga-b1253b174/"
  },
  {
      "firstName": "David",
      "lastName": "Braun",
      "jobTitle": "Web Developer",
      "numberOfYearExperience": 2,
      "linkedinProfileUrl": "https://www.linkedin.com/in/gloire-kafwalubi-3152871a0/"
  }
];

// Predefined list of people to delete by ID
const predefinedDeleteIds = [
  "6643867c68bfac6bddabeb62", 
];

// Predefined list of updates (ID and update data)
const predefinedUpdates = [
  {
      id: "6643867c68bfac6bddabeb63", // Example ObjectId, replace with actual ID
      updateData: { jobTitle: 'Senior Web Developer' }
  },
];

// Insert predefined people on server start
(async () => {
  /**try {
      console.log("Inserting predefined people");
      await insertPeopleInDB(predefinedPeople);
      console.log("Predefined people inserted successfully.");
  } catch (error) {
      console.error(error);
  }*/

  // Delete predefined people by ID on server start
  for (const id of predefinedDeleteIds) {
    try {
        console.log(`Deleting person with ID: ${id}`);
        await deletePersonById(id);
    } catch (error) {
        console.error(`Error deleting person with ID ${id}:`, error);
        }
  }

  // Update predefined people by ID on server start
  for (const { id, updateData } of predefinedUpdates) {
      try {
          console.log(`Updating person with ID: ${id}`);
          await updatePersonById(id, updateData);
      } catch (error) {
          console.error(`Error updating person with ID ${id}:`, error);
      }
  }
})();

//
routes(app);

app.listen(PORT, function(){
    console.log(`Server running on http://${PORT}`);
});

//app.listen(PORT, HOST, function(){
//    console.log(`Server running on http://${HOST}:${PORT}`);
//});