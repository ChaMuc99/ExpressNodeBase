const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routers'); // Import routes

const sequelize = require('./configs/connections/postgresql');

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Sync Sequelize models with the database
sequelize.sync()
    .then(() => console.log('Database synchronized'))
    .catch(err => console.error('Database synchronization failed:', err));

// Use routes
app.use('/api', routes);


// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
