
import { home, getTodayDate, getMonthsName, getPeople, insertPeopleToDB, deletePerson, updatePerson } from "../controllers/controller.js";

//set up routing

const routes = (app)=>{

    //home page 
    app.route('/').get(home);

    // get APi list of People from MongoDB

    // Delete API list of people from MongoDB
    app.route('/people/:id').delete(deletePerson); 

    // Update API or Edit list of people from MongoDB
    app.route('/people/:id').put(updatePerson); 

    // POST API Add people to DB
    app.route('/addPeople').post(insertPeopleToDB);

    // API Get home page
    app.route('/home').get(home);
    // API Get today's date
    app.route('/today').get(getTodayDate);
    // API Get Months
    app.route('/months').get(getMonthsName);
    // API Get People
    app.route('/people').get(getPeople);

}

export default routes;