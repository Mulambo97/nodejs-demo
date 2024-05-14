import path from 'path';
import { insertPeopleInDB, getPeopleFromDB } from '../models/model.js';

const __dirname = path.resolve();

export const home = (req, res) => {
    // Show this file when '/' is requested
    const filePath = path.join(__dirname, "source/pages/home.html");
    res.sendFile(filePath);
};

// POST API to insert people info into the MongoDB
export const insertPeopleToDB = async (req, res) => {
    const people = req.body;
    console.log('Inserting people:', people);
    try {
        await insertPeopleInDB(people);
        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting data:', error);
    }
};

// GET API to retrieve people from the MongoDB
export const getPeople = async (req, res) => {
    try {
        const people = await getPeopleFromDB();
        console.log('Retrieved people:', people);
        res.json(people);
    } catch (error) {
        console.error('Error retrieving data:', error);
    }
};


// API to delete a person from the DB by ID
export const deletePerson = async (req, res) => {
    const { id } = req.params; // Get ID from request parameters
    console.log('Deleting person with ID:', id);
    try {
        await deletePersonById(id);
        res.status(200).send(`Person with ID ${id} deleted successfully`);
    } catch (error) {
        console.error('Error deleting person:', error);
        res.status(500).send('Error deleting person');
    }
};

// API to update a person in the DB by ID
export const updatePerson = async (req, res) => {
    const { id } = req.params; // Get ID from request parameters
    const updateData = req.body; // Get update data from request body
    console.log('Updating person with ID:', id, 'with data:', updateData);
    try {
        await updatePersonById(id, updateData);
        res.status(200).send(`Person with ID ${id} updated successfully`);
    } catch (error) {
        console.error('Error updating person:', error);
        res.status(500).send('Error updating person');
    }
};

// Get and show today's date
export const getTodayDate = (req, res) => {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; // months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const newDate = `${day}/${month}/${year}`;
    res.json({ today: newDate });
};

// Get list of month names
export const getMonthsName = (req, res) => {
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
};
