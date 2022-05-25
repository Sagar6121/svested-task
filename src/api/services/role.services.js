const { Role } = require('../models');


// Create Role
exports.createRole = (body) => {
    try {
        const role = body;
        Role.create({...role });
        return { message: "role created successfully" };
    } catch (error) {
        console.log('Error', error);
        return { message: error };
    }
}