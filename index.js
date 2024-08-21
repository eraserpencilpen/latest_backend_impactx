const express = require('express');
const { verifyToken } = require('./path/to/serviceAccountKey.json');
const admin = require('firebase-admin');
const app = express();
const PORT = process.env.PORT || 65000;
app.use(express.json());
// Endpoint for user registration
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await admin.auth().createUser({
            email,
            password,
        });
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
// Endpoint for user login (generates custom token)
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await admin.auth().getUserByEmail(email);
        // Normally, you would verify the password here
        // Since Firebase Admin SDK does not handle password verification, this is just for demonstration
        const token = await admin.auth().createCustomToken(user.uid);
        res.status(200).send({ token });
    } catch (error) {
        res.status(400).send(error.message);
    }
});
// Middleware to protect routes
app.use(async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        try {
            req.user = await verifyToken(token);
            next();
        } catch (error) {
            res.status(401).send('Unauthorized');
        }
    } else {
        res.status(401).send('Unauthorized');
    }
});
// Protected route example
app.get('/profile', (req, res) => {
    res.send(`Hello ${req.user.email}`);
});


app.get("/",(req,res)=>{
    res.send("Hello. this is working!")
})
// Protected route example
app.get('/profile', (req, res) => {
    res.send(`Hello ${req.user.email}`);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


const Farmer = require('./farmer');
const Customer = require('./customer');

// Example Usage
const farmer = new Farmer("farmer1", "John Doe", "1234567890", "john.doe@farm.com", "securepassword", "Farm Location", "9am - 5pm");
farmer.save();

const customer = new Customer("customer1", "Jane Smith", "9876543210", "jane.smith@shop.com", "securepassword", 100);
customer.save();
