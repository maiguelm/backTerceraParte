import bcrypt from 'bcrypt';
import MocksRepository from '../repository/MocksRepository.js';
import Users from '../dao/Users.dao.js';
import Pets from '../dao/Pets.dao.js';
import { faker } from '@faker-js/faker';

const usersDao = new Users();
const petsDao = new Pets();
const mocksRepository = new MocksRepository(usersDao, petsDao);

const generateMockUsers = (num) => {
    const users = [];
    for (let i = 0; i < num; i++) {
        const user = {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: bcrypt.hashSync('coder123', 10),
            role: i % 2 === 0 ? 'user' : 'admin',
            pets: [],
        };
        users.push(user);
    }
    return users;
};

const generateMockPets = (num) => {
    const pets = [];
    for (let i = 0; i < num; i++) {
        const pet = {
            name: faker.animal.petName(),
            specie: faker.animal.type(),
            birthDate: faker.date.birthdate(),
            adopted: false,
        };
        pets.push(pet);
    }
    return pets;
};

const saveMockData = async (usersCount, petsCount) => {
    const mockUsers = generateMockUsers(usersCount);
    const savedUsers = await mocksRepository.saveUsers(mockUsers);

    const mockPets = generateMockPets(petsCount);
    const savedPets = await mocksRepository.savePets(mockPets);

    return { savedUsers, savedPets };
};

export default {
    generateMockUsers,
    generateMockPets,
    saveMockData,
};