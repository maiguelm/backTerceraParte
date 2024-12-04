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

    // Generar adopciones aleatorias: asignar 15 mascotas a 5 usuarios
    const usersCount = Math.min(5, users.length);
    const petsCount = Math.min(15, pets.length);

    for (let i = 0; i < petsCount; i++) {
        const user = users[i % usersCount]; // Selecciona usuarios de forma cíclica
        const pet = pets[i]; // Selecciona mascotas de manera secuencial

        // Verificar que la mascota no esté ya adoptada
        if (!pet.adopted) {
            pet.adopted = true;
            user.pets.push(pet._id); // Asigna la mascota al usuario

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

    // Generar adopciones
    const adoptions = generateMockAdoptions(savedUsers, savedPets); //agregado

    // Aquí deberías agregar el DAO para guardar las adopciones
    const savedAdoptions = await mocksRepository.saveAdoptions(adoptions); //agregado

    return { savedUsers, savedPets, savedAdoptions };
};

export default {
    generateMockUsers,
    generateMockPets,
    saveMockData,
};
