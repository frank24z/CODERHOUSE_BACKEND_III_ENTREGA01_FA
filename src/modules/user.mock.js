import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';



const createRandomUser = () => {
    const hashedPassword = bcrypt.hashSync('coder123', 10);

    return {
        _id: faker.database.mongodbObjectId(), 
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        age: faker.number.int({ min: 18, max: 80 }),
        password: hashedPassword,
        role: faker.helpers.arrayElement(['user', 'admin']), 
        pets: [], 
    };
};

 @param {number} count
 @returns {Array<object>}  

export const generateUsers = (count) => {
    const users = [];
    for (let i = 0; i < count; i++) {
        users.push(createRandomUser());
    }
    return users;
};