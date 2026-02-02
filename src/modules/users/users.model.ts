import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true , index: true }, 
    password: { type: String, required: true },
    role: { type: String, enum: ['user'], default: 'user' }, 
    // only role user for now for simplicity , and test purposes if i had time i would have implmented auth with rbac and merhcant owner and make it complete
    // example [customer, merchant, admin]
   createdAt: { type: Date, default: Date.now }
});


const User = mongoose.model('User', userSchema);

export default User;