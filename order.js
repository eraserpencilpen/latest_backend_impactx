// customer.js
const User = require('../user');

// create a class to store order information
class order {
    constructor(order_ID, Customer_ID, Order_date, status, total_amount, goods_name, goods_quantity, goods_price, farmer_ID, final_amount ){
        this.order_ID = order_ID
        this.Customer_ID = Customer_ID
        this.Order_date = Date
        this.status = status
        this.total_amount = total_amount
        this.goods_name = product_name
        this.goods_price = product_price
        this.farmer_ID = farmer_ID
    }

    // method to save 
    async save() {
        try {
            const orderRef = db.collection('orders').doc(this.order_ID); // Use 'orders' collection
            await orderRef.set({
                order_ID: this.order_ID,
                Customer_ID: this.Customer_ID,
                Order_date: this.Order_date,
                status: this.status,
                total_amount: this.total_amount,
                goods_name: this.goods_name,
                goods_quantity: this.goods_quantity,
                goods_price: this.goods_price,
                farmer_ID: this.farmer_ID,
                final_amount: this.final_amount
            });
            console.log("Order added with ID: ", this.order_ID);
        } catch (error) {
            console.error("Error adding order: ", error);
        }
    }

    // method to fetch order by farmer_ID
    static async fetchByFarmer(farmer_ID) {
        try {
            const ordersRef = db.collection('orders');
            const snapshot = await ordersRef.where('farmer_ID', '==', farmer_ID).get();
            if (snapshot.empty) {
                console.log('No matching orders.');
                return;
            }
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
            });
        } catch (error) {
            console.error("Error fetching orders: ", error);
        }
    }

    // method to fetch order details by customer_ID
    
    static async fetchByCustomer(Customer_ID) {
        try {
            const ordersRef = db.collection('orders');
            const snapshot = await ordersRef.where('Customer_ID', '==', Customer_ID).get();
            if (snapshot.empty) {
                console.log('No matching orders.');
                return;
            }
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
            });
        } catch (error) {
            console.error("Error fetching orders: ", error);
        }
    }
}

module.exports = Order;