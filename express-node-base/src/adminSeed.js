// src/adminSeed.js
const AdminService = require('./services/AdminService'); // Ensure path is correct
const sequelize = require('./configs/connections/postgresql'); // Ensure path is correct

console.log('AdminService:', AdminService);

async function seedAdmin() {
    try {
        // Admin credentials
        const adminData = {
            email: 'admin@gmail.com',
            password: 'admin123',
            role: 'admin'
        };

        // Check if admin already exists using AdminService
        const existingAdmin = await AdminService.getAdminByEmail(adminData.email);

        if (!existingAdmin) {
            // Create admin if not exists using AdminService
            await AdminService.createAdmin(adminData);
            console.log('Admin account created successfully.');
        } else {
            console.log('Admin account already exists.');
        }

    } catch (error) {
        console.error('Error seeding admin account:', error);
    } 
}

seedAdmin();
