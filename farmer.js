const User = require('./user');
const { db } = require('./path/to/firebase'); // Ensure you have initialized Firestore

class Farmer extends User {
    constructor(userID, name, contactNumber, email, password, farmLocation, businessHours) {
        super(userID, name, contactNumber, email, password);
        this.farmLocation = farmLocation;
        this.businessHours = businessHours;
    }

    // Save Farmer to Firestore
    async save() {
        try {
            const hashedPassword = await this.hashPassword(this.password);
            const userRef = db.collection('farmers').doc(this.userID); // Use 'farmers' collection
            await userRef.set({
                userID: this.userID,
                name: this.name,
                contactNumber: this.contactNumber,
                email: this.email,
                password: hashedPassword,
                farmLocation: this.farmLocation,
                businessHours: this.businessHours
            });
            console.log("Farmer added with ID: ", this.userID);
        } catch (error) {
            console.error("Error adding farmer: ", error);
        }
    }
}

module.exports = Farmer;
