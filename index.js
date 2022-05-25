const express = require('express');
const PORT = process.env.PORT || 8000;
const app = express();
const userRoutes = require('./src/api/routes/user.routes');
const db = require("./src/api/models");
const passport = require('passport');
const cors = require('cors');
require('dotenv').config();

// Cors Options
app.use(cors("*"));

// Parse incoming requests data to JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// For Passport
app.use(passport.initialize());

// Database connection
db.sequelize.authenticate().then(() => {
    console.log("Database Connected");
});
db.sequelize.sync();


// Routes Register
app.use('/', userRoutes);

app.get('*', (req, res) => res.status(400).send({
    message: '404 Not Found',
}));


// App Listening Port
app.listen(PORT, () => {
    console.log("Server Running on ::", PORT);
});