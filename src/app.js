import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/database.js';

import mocksRouter from './routers/mocks.router.js';
import User from './models/user.model.js';
import Pet from './models/pet.model.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas
app.use('/api/mocks', mocksRouter); 


app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ status: 'success', payload: users });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

app.get('/api/pets', async (req, res) => {
    try {
        const pets = await Pet.find();
        res.status(200).json({ status: 'success', payload: pets });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Servidor escuchando en el puerto ${PORT}`);
});