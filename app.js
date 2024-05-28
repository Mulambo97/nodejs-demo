import express from 'express';
import routes from './source/routes/route.js';

// variable
const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

//body parses
//create Javascrip array from req parses
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//
routes(app);

app.listen(PORT, function(){
    console.log(`Server running on http://${PORT}`);
});

