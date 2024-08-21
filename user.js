const bcrypt = require('bcrypt');
const { db } = require('./path/to/firebase'); // Ensure you have initialized Firestore

class User {
    constructor(userID, name, contactNumber, email, password) {
        this.userID = userID;
        this.name = name;
        this.contactNumber = contactNumber;
        this.email = email;
        this.password = password; // Raw password will be hashed before saving
    }

    // Hash the password using bcrypt
    async hashPassword(password) {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }

    // Save user to Firestore
    async save() {
        try {
            const hashedPassword = await this.hashPassword(this.password);
            const userRef = db.collection('users').doc(this.userID);
            await userRef.set({
                userID: this.userID,
                name: this.name,
                contactNumber: this.contactNumber,
                email: this.email,
                password: hashedPassword // Store hashed password
            });
            console.log("User added with ID: ", this.userID);
        } catch (error) {
            console.error("Error adding user: ", error);
        }
    }
}

module.exports = User;
