import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['user', 'admin'], // El rol solo puede ser uno de estos dos valores
        default: 'user' 
    },
    pets: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Pet' // Referencia al modelo 'Pet'
    }]
}, { 
    timestamps: true // Esto añade automáticamente los campos createdAt y updatedAt
});

const User = mongoose.model('User', userSchema);

export default User;