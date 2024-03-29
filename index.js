import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ConnectDB from './DB/index.js';
import Team from './Models/Team.model.js';
import User from './Models/User.model.js';


const app = express();
dotenv.config();
app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/teams', async (req, res) => {
    try {
        const teams = await Team.find().populate({
            path: 'members.user',
            select: '-password' // Excluding the password field
        });

        res.render('index', { teams: teams }); // Change 'teams' to 'index'
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

ConnectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on PORT ${process.env.PORT}`);
    });
}).catch((error) => {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
});