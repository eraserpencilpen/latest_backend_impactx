// customer.js
const User = require('./user');

// Customer Class
class Customer extends User {
    constructor(userID, name, contactNumber, email, password, cartPoints) {
        super(userID, name, contactNumber, email, password);
        this.cartPoints = cartPoints;
    }

    // Save Customer to Firestore
    async save() {
        try {
            const hashedPassword = await this.hashPassword(this.password);
            const userRef = db.collection('customers').doc(this.userID); // Use 'customers' collection
            await userRef.set({
                userID: this.userID,
                name: this.name,
                contactNumber: this.contactNumber,
                email: this.email,
                password: hashedPassword,
                cartPoints: this.cartPoints
            });
            console.log("Customer added with ID: ", this.userID);
        } catch (error) {
            console.error("Error adding customer: ", error);
        }
    }
}

module.exports = Customer;
