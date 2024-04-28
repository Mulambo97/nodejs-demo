
import { home, getTodayDate, getMonthsName, getPeople } from "../controllers/controller.js";

//set up routing

const routes = (app)=>{

    //home page 
    app.route('/').get(home);

    //Get home page
    app.route('/home').get(home);
    //Get today's date
    app.route('/today').get(getTodayDate);
    //Get Months
    app.route('/months').get(getMonthsName);
    // Get People
    app.route('/people').get(getPeople);

}

export default routes;