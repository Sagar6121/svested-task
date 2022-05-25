const userRoutes = require('express').Router();
const userController = require('../controllers/user.controller');
const roleController = require('../controllers/role.controller');

const passport = require('passport');
require('../middleware/passport')(passport);


// Add Role for User
userRoutes.post('/add/role', roleController.createRole);

// Create user
userRoutes.post('/signup', userController.signup);

//Sign-in 
userRoutes.post('/signin', userController.signin);

//Sign-in 
userRoutes.post('/process', passport.authenticate('jwt', { session: false }), userController.processData);

// Fetach Data
userRoutes.get('/fetch', passport.authenticate('jwt', { session: false }), userController.fetchData);

// Get All user List
userRoutes.get('/', passport.authenticate('jwt', { session: false }), userController.getAllUserData);

// User delete 
userRoutes.delete('/:user_id', passport.authenticate('jwt', { session: false }), userController.deleteUserById);

// User delete 
userRoutes.put('/:user_id', passport.authenticate('jwt', { session: false }), userController.updateUserById);


module.exports = userRoutes;