import { Router } from 'express';
import { faker } from '@faker-js/faker';
import { generateUsers } from '../modules/user.mock.js';
import User from '../models/user.model.js';
import Pet from '../models/pet.model.js';

const router = Router();


router.get('/mockingpets', (req, res) => {
    const pets = [];
    for (let i = 0; i < 20; i++) {
        pets.push({
            _id: faker.database.mongodbObjectId(),
            name: faker.animal.dog(),
            specie: faker.animal.type(),
            birthDate: faker.date.past(),
        });
    }
    res.status(200).json({ status: 'success', payload: pets });
});


router.get('/mockingusers', (req, res) => {
    const users = generateUsers(50);
    res.status(200).json({ status: 'success', payload: users });
});


router.post('/generateData', async (req, res) => {
    const { users: userCount = 10, pets: petCount = 5 } = req.body;

    try {
        // Generar usuarios
        const usersToInsert = generateUsers(parseInt(userCount));
        
        // Generar mascotas
        const petsToInsert = [];
        for (let i = 0; i < parseInt(petCount); i++) {
            petsToInsert.push({
                name: faker.animal.cat(),
                specie: 'Gato',
                birthDate: faker.date.past(),
            });
        }

        // Insertar los datos generados en la base de datos
        const usersResult = await User.insertMany(usersToInsert);
        const petsResult = await Pet.insertMany(petsToInsert);

        res.status(201).json({
            status: 'success',
            message: 'Datos generados e insertados correctamente.',
            payload: {
                users_inserted: usersResult.length,
                pets_inserted: petsResult.length
            }
        });

    } catch (error) {
        console.error("Error al generar e insertar datos:", error);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor.' });
    }
});


export default router;