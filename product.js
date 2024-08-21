// customer.js
const User = require('../user');

// create a data class for product database

class product {

    constructor(product_ID, product_price, product_name,category, description,location, business_name, farmer_id ){
        this.product_id = product_ID
        this.product_price = product_price
        this.product_name = product_name
        this.category = category
        this.description = description
        this.location = location
        this.business_name = business_name
        this.farmer_id = farmer_id
    }

    async save() {
        try {
            const productRef = db.collection('products').doc(this.product_id); // Use 'products' collection
            await productRef.set({
                product_id: this.product_id,
                product_price: this.product_price,
                product_name: this.product_name,
                category: this.category,
                description: this.description,
                location: this.location,
                business_name: this.business_name,
                farmer_id: this.farmer_id
            });
            console.log("Product added with ID: ", this.product_id);
        } catch (error) {
            console.error("Error adding product: ", error);
        }
    }
}

module.exports = Product;