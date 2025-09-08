import { Router } from 'express';
import { faker } from '@faker-js/faker';
import { generateUsers } from '../modules/user.mock.js';
import User from '../models/user.model.js';
import Pet from '../models/pet.model.js';

const router = Router();

// ## Criterio 1: Migración del endpoint /mockingpets
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

// ## Criterio 2 y 3: Endpoint para generar 50 usuarios con el módulo de Mocking
router.get('/mockingusers', (req, res) => {
    // Usamos la función que creamos en el módulo user.mock.js
    const users = generateUsers(50);
    res.status(200).json({ status: 'success', payload: users });
});

// ## Criterio 4: Endpoint para generar e insertar datos en la DB
router.post('/generateData', async (req, res) => {
    // Obtenemos la cantidad de usuarios y mascotas del body, con valores por defecto
    const { users: userCount = 10, pets: petCount = 5 } = req.body;

    try {
        // Generar usuarios usando nuestro módulo
        const usersToInsert = generateUsers(parseInt(userCount));
        
        // Generar mascotas (lógica simple de ejemplo)
        const petsToInsert = [];
        for (let i = 0; i < parseInt(petCount); i++) {
            petsToInsert.push({
                name: faker.animal.cat(),
                specie: 'Gato', // Especie fija para el ejemplo
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