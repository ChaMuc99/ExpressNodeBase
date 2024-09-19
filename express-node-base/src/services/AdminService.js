// src/services/AdminService.js
const Admin = require('../models/Admin');  // Adjusted to use Admin model

const AdminService = {
    // Create a pre-made admin account (for setup purposes)
    async createAdmin(adminData) {
        // Check if the admin account already exists
        const existingAdmin = await Admin.findOne({ where: { email: adminData.email } });
        if (existingAdmin) {
            return { message: 'Admin account already exists' };
        }

        // Create new admin account
        const admin = await Admin.create(adminData);
        return admin;
    },

    async getAdminByEmail(email) {
        return await Admin.findOne({ where: { email } });
    },

    // Other admin-specific operations can be added here in the future
};

module.exports = AdminService;
