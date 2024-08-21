// customer.js
const User = require('../user');

class product_order {
    constructor(product_ID, order_ID){
        this.Product_ID = product_ID
        this.Order_ID = order_ID   
    }


    // method to save product_order
    async save(){
        try{
            const ProductOrderRef = db.collection('product_order').doc('product_ID'&&'order_ID');
            await ProductOrderRef.set({
                product_ID : this.Product_ID,
                order_ID : this.Order_ID
            });
            console.log("Product_Order Added with: Product ID :" + this.Product_ID + "|| Order ID :" + this.Order_ID);
        } catch (error){
            console.error("Error Occured at :" + error);
        }
    }

}