const express = require('express');
const { verifyToken } = require('./path/to/serviceAccountKey.json');
const admin = require('firebase-admin');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
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

// push request when at upload page
app.post('/profile/UploadGoods', (req,res) =>{
    const sqlite3 = require("sqlite3");
    const db = new sqlite3.Database('./orders.db');
    const goodsData = req.body;
    console.log(goodsData);
    const {goodsName,goods_Quantity,goods_Price} = goodsData;

    // write to database
    const sql = `INSERT INTO INVENTORY (goods_name, goods_quantity, goods_price) VALUES (?, ?, ?)`;

    db.all(sql,[goodsName, goods_Quantity, goods_Price], (err,result) => {
        if (err) {
            console.error(err);
            res.status(500).send(`ERROR UPLOADING GOODS`);
            return;
        }
        console.log(result);
        res.status(200).send('GOODS UPLOADED SUCCESFULLY');
    });

    db.close();
});

// logic : from goods page, parse goods name, quantity, into json , upload into orders.db orders table, 
app.post('/profile/OrderGoods', (req,res) => {
    const sqlite3 = require("sqlite3");
    const db = new sqlite3.Database('./orders.db');
    const OrderData = req.body;
    console.log(OrderData)
    const {goodsName, OrderedQuantity, OrderPrice, OrderDate} = OrderData;
    // write to database
    const sql = `INSERT INTO ORDERS (goods_name, order_date, goods_quantity, goods_price) VALUES (?, ?, ?, ?)`;
    // insert data to database
    db.all(sql, [goodsName, OrderedQuantity, OrderPrice, OrderDate],(err,result) => {
        if (err) {
            console.error(err, result);
            res.status(500).send('ERROR SAVING ORDER');
            return;
        }
        console.log(result);
        res.status(200).send('GOODS UPLOADED SUCCESFULLY');
    });

    db.close();

});



function init_db(){
    const sqlite3 = require("sqlite3");
    const db = new sqlite3.Database('./orders.db');
    sql = `CREATE TABLE orders (
    id INTEGER,
    goods_name VARCHAR(255),
    order_date VARCHAR(255),
    goods_quantity VARCHAR(255),
    goods_price TEXT,
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

console.log("index.js has run with no problems.");