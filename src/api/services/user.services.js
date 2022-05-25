const { getLoggedInUser } = require('../helper/getLoggedInUser');
const { User } = require('../models');
const { Process } = require('../models');
const responseData = require('../data/data.json');

exports.getAllUserData = async() => {
    try {
        const userlist = await User.findAndCountAll({
            attributes: {
                exclude: ['password']
            }
        });
        return userlist;
    } catch (error) {
        return error;
    }

}

exports.processData = async() => {
    try {
        const processData = await Process.bulkCreate(responseData);
        return processData;
    } catch (error) {
        console.log('Error', error);
        return error
    }
};

exports.fetchData = async() => {
    try {
        const data = await Process.findAll();
        return data;
    } catch (error) {   
        return error;
    }

}


exports.deleteUserById = async(req, userId) => {
    try {
        return await User.destroy({ where: { id: userId } });
    } catch (error) {
        return error;
    }
};

exports.updateUserById = async(req, data, userId) => {
    try {

        const userData = await User.update(data, { where: { id: userId } });
        if (userData[0] == 1) {
            return;
        } else {
            return { message: "user not found", error: true };
        }

    } catch (error) {
        return error;
    }
};