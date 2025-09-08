import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specie: { type: String, required: true },
    birthDate: { type: Date }
}, { 
    timestamps: true 
});

const Pet = mongoose.model('Pet', petSchema);

export default Pet;