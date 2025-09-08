import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

/**
 * Función que crea un solo usuario falso con datos aleatorios.
 * Cumple con los requisitos: contraseña encriptada, rol variable y pets vacío.
 * @returns {object} Un objeto de usuario con formato similar al de Mongo.
 */
const createRandomUser = () => {
    // Encriptamos la contraseña "coder123" para cada usuario.
    const hashedPassword = bcrypt.hashSync('coder123', 10);

    return {
        _id: faker.database.mongodbObjectId(), // Simula un ID de Mongo
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        age: faker.number.int({ min: 18, max: 80 }),
        password: hashedPassword, // La contraseña ya está hasheada
        role: faker.helpers.arrayElement(['user', 'admin']), // Elige un rol al azar
        pets: [], // El array de mascotas siempre va vacío
    };
};

/**
 * Genera un array con la cantidad de usuarios falsos especificada.
 * @param {number} count - El número de usuarios a generar.
 * @returns {Array<object>} Un array de objetos de usuario.
 */
export const generateUsers = (count) => {
    const users = [];
    for (let i = 0; i < count; i++) {
        users.push(createRandomUser());
    }
    return users;
};