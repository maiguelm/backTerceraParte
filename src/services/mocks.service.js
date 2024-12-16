import bcrypt from "bcrypt";
import MocksRepository from "../repository/MocksRepository.js";
import Users from "../dao/Users.dao.js";
import Pets from "../dao/Pets.dao.js";
import { faker } from "@faker-js/faker";
import Adoption from "../dao/Adoption.js";

const usersDao = new Users();
const petsDao = new Pets();
const adoptionsDao = new Adoption();
const mocksRepository = new MocksRepository(usersDao, petsDao, adoptionsDao);

const generateMockUsers = (num) => {
    const users = [];
    for (let i = 0; i < num; i++) {
        const user = {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: bcrypt.hashSync("coder123", 10),
            role: i % 2 === 0 ? "user" : "admin",
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

const generateMockAdoptions = (users, pets) => {
    const adoptions = [];

    const usersCount = Math.min(5, users.length);
    const petsCount = Math.min(15, pets.length);

    for (let i = 0; i < petsCount; i++) {
        const user = users[i % usersCount]; 
        const pet = pets[i]; 

        if (!pet.adopted) {
            pet.adopted = true;
            user.pets.push(pet._id); 

            adoptions.push({
                user: user._id,
                pet: pet._id,
                adoptionDate: new Date(),
            });
        }
    }

    return adoptions;
};

const saveMockData = async (usersCount, petsCount) => {
    const mockUsers = generateMockUsers(usersCount);
    const savedUsers = await mocksRepository.saveUsers(mockUsers);

    const mockPets = generateMockPets(petsCount);
    const savedPets = await mocksRepository.savePets(mockPets);

    const adoptions = generateMockAdoptions(savedUsers, savedPets); //agregado

    const savedAdoptions = await mocksRepository.saveAdoptions(adoptions); //agregado

    return { savedUsers, savedPets, savedAdoptions };
};

export default {
    generateMockUsers,
    generateMockPets,
    saveMockData,
};
