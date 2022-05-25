const { Role } = require('../models');
const { createRole } = require('../services/role.services');

// Create Role
exports.createRole = (req, res) => {
    try {
        const roledata = createRole(req.body);
        return res.status(200).send(roledata);

    } catch (error) {
        console.log('Error', error);
        return res.status(500).send({ message: error });
    }
}