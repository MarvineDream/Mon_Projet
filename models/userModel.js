import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const username = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});


userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hash(this.password, 10);
    }
    next();
});


const User = mongoose.model('User', userSchema);

export default User;