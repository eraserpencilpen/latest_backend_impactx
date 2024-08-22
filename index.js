const express = require('express');
const { verifyToken } = require('./path/to/serviceAccountKey.json');
const admin = require('firebase-admin');
const app = express();
const cors = require('cors');

app.use(cors());
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
// // Middleware to protect routes
// app.use(async (req, res, next) => {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (token) {
//         try {
//             req.user = await verifyToken(token);
//             next();
//         } catch (error) {
//             res.status(401).send('Unauthorized');
//         }
//     } else {
//         res.status(401).send('Unauthorized');
//     }
// });
// Protected route example
app.get('/profile', (req, res) => {
    res.send(`Hello ${req.user.email}`);
});


app.get("/",(req,res)=>{
    res.send("Hello. this is working!")
    console.log("response sent.")
})
// Protected route example
app.get('/profile', (req, res) => {
    res.send(`Hello ${req.user.email}`);
});
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});

// only one farmer that is Mark
// only one user that is Ming

function init_db(){
    const sqlite3 = require("sqlite3");
    const db = new sqlite3.Database('./orders.db');
    sql = `CREATE TABLE orders (
    id INTEGER,
    goods_name VARCHAR(255),
    order_date VARCHAR(255),
    goods_quantity VARCHAR(255),
    goods_price VARCHAR(255),
    PRIMARY KEY(id AUTOINCREMENT)
    )`;
    // db.run(sql)

    sql2 = `
    CREATE TABLE inventory(
    id INTEGER,
    goods_name VARCHAR(255),
    goods_quantity VARCHAR(255),
    goods_price TEXT,
    PRIMARY KEY(id AUTOINCREMENT)
    )
    `
    // db.run(sql2);

    sql3 = `CREATE TABLE requests(
    id INTEGER,
    goods_name VARCHAR(255),
    goods_quantity VARCHAR(255),
    status VARCHAR(255),
    PRIMARY KEY(id AUTOINCREMENT)
    )` // Status is either a for accepted, 
    // d for declined and nd for not determined.
    // db.run(sql3);    
}

function populate_db(){
    const sqlite3 = require("sqlite3");
    const db = new sqlite3.Database('./orders.db');

    sql = `
    INSERT INTO inventory (goods_name, goods_quantity, goods_price) VALUES
('Apples', '100 kg', '5.00 RM/kg'),
('Bananas', '200 bunches', '2.67 RM/bunch'),
('Carrots', '50 kg', '4.00 RM/kg'),
('Tomatoes', '75 kg', '3.33 RM/kg'),
('Potatoes', '100 kg', '3.00 RM/kg'),
('Oranges', '120 kg', '4.67 RM/kg'),
('Lettuce', '30 kg', '2.33 RM/kg'),
('Cucumbers', '40 kg', '3.00 RM/kg'),
('Broccoli', '20 kg', '6.00 RM/kg'),
('Spinach', '25 kg', '2.00 RM/kg'),
('Strawberries', '50 kg', '8.33 RM/kg'),
('Watermelons', '30 pcs', '16.67 RM/pc'),
('Mangoes', '70 kg', '6.00 RM/kg'),
('Pumpkins', '20 pcs', '10.00 RM/pc'),
('Cabbages', '40 kg', '2.67 RM/kg');
    `
    db.run(sql);
}



// init_db();
// populate_db();

// const Farmer = require('./farmer');
// const Customer = require('./customer');

// // Example Usage
// const farmer = new Farmer("farmer1", "John Doe", "1234567890", "john.doe@farm.com", "securepassword", "Farm Location", "9am - 5pm");
// farmer.save();

// const customer = new Customer("customer1", "Jane Smith", "9876543210", "jane.smith@shop.com", "securepassword", 100);
// customer.save();

console.log("index.js has run with no problems.")