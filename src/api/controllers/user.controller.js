const { getAllUserData, deleteUserById, updateUserById , fetchData, processData } = require('../services/user.services');
const { sequelize, User, Role } = require('../models');
const jwt = require('jsonwebtoken');
const bCrypt = require('bcrypt');


//user and admin signup
exports.signup = async(req, res) => {
    try {
        const user = req.body;

        // Generate hash password
        const saltRounds = 10;
        const salt = bCrypt.genSaltSync(saltRounds);
        bCrypt.hash(user.password, salt, async(err, hash) => {
            if (err) {
                res.send({ 'err': 'failed to encrypt password' });
            }
            user.password = hash;
            const role = await Role.findOne({ where: { name: user.role } });
            if (!role) return res.status(400).send({ message: "role not found" });

            Object.assign(user, { role_id: role.id });

            return User.create({
                    ...user
                })
                .then((user) => res.status(201).send({ 'message': 'user created successfully', 'data': user }))
                .catch((error) => res.status(400).send(error));
        });
    } catch (error) {
        console.log('Error', error);
        return res.status(500).send({ message: error });
    }
};


exports.signin = async(req, res) => {
    try {
        username = req.body.username;
        password = req.body.password;

        // Compare user password function
        const isValidPassword = function(password, encPassword) {
            return bCrypt.compareSync(password, encPassword);
        }
        User.findOne({
            where: {
                username: username
            }
        }).then(function(user) {
            if (!user) {
                return res.json({ message: 'user not found' });
            }
            const userJson = user;

            // Compare User password
            if (!isValidPassword(password, userJson.password)) {
                return res.json({ message: 'incorrect username or password' });
            }
            // Generate Token
            var token = jwt.sign({ user_id: user.id, userData: user }, process.env.jwt_encryption);

            res.json({
                token: token,
                name: userJson.name,
                id: userJson.id
            });
        });
    } catch (error) {
        return res.send({ message: error });
    }
};

exports.processData = async(req, res) => {
    try {
        const fetchedData = await processData();
        return res.status(200).send(fetchedData);
    } catch (error) {
        console.log('Error', error);
        return res.status(500).send({ message: error });
    }
};


exports.fetchData = async(req, res) => {
    try {
        const fetchedData = await fetchData();
        return res.status(200).send(fetchedData);
    } catch (error) {
        console.log('Error', error);
        return res.status(500).send({ message: error });
    }
};



exports.getAllUserData = async(req, res) => {
    try {
        const userData = await getAllUserData();
        return res.status(200).send(userData);
    } catch (error) {
        console.log('Error', error);
        return res.status(500).send({ message: error });
    }
};

exports.deleteUserById = async(req, res) => {
    try {
        const user_id = req.params.user_id;
        const user = await deleteUserById(req, user_id);
        if (user.error) {
            return res.status(401).send({ message: user.message });
        }
        return res.status(200).send({ message: "User deleted" });
    } catch (error) {
        console.log('Error', error);
        return res.status(500).send({ message: error });
    }
};


exports.updateUserById = async(req, res) => {
    try {
        const user_id = req.params.user_id;
        const userData = req.body;
        const user = await updateUserById(req, userData, user_id);
        if (user && user.error) {
            return res.status(401).send({ message: user.message });
        }
        return res.status(200).send({ message: "User Updated" });
    } catch (error) {
        console.log('Error', error);
        return res.status(500).send({ message: error });
    }
};