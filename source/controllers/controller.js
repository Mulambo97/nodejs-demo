import path from 'path';
const __dirname = path.resolve();

export const home = (req, res) =>{
    //show this file '/' is requested
    const filePath = path.join(__dirname, "source/pages/home.html");
    res.sendFile(filePath);
}

// get and show today's date
export const getTodayDate =(req, res) =>{
    var dateObj = new Date();
    var month = dateObj.getUTCMonth()+1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = day+ "/"+ month +"/"+ year;
    res.json({
        today:newdate
    });
}

// get list of month name 

export const getMonthsName =(req, res) =>{
    res.json({
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December'
    });
}

// get list of people 

export const getPeople = (req, res) =>{
    res.json([
        {
            FirstName: 'Yann',
            LastName: 'Mulonda',
            title: 'Software Engineer',
            LinkedIn: 'https://www.linkedin.com/in/yannmjl/'
        },
        {
            FirstName: 'Bernard',
            LastName: 'Ng',
            title: 'Software Engineer',
            LinkedIn: 'https://www.linkedin.com/in/bernard-ngandu/'
        },
        {
            FirstName: 'Clerc',
            LastName: 'Kapema',
            title: 'Web Developer',
            LinkedIn: 'https://www.linkedin.com/in/clerc-ngonga-b1253b174/'
        },
        {
            FirstName: 'Gloire',
            LastName: 'Kafwalubi',
            title: 'Web Developer',
            LinkedIn: 'https://www.linkedin.com/in/gloire-kafwalubi-3152871a0/'
        }
    ]);
}