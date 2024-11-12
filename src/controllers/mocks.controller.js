import mocksService from '../services/mocks.service.js';

const getMockUsers = async (req, res) => {
    const usersCount = parseInt(req.query.num) || 50; 
    const mockUsers = mocksService.generateMockUsers(usersCount);
    res.send({ status: 'success', payload: mockUsers });
};

const getMockPets = async (req, res) => {
    const petsCount = parseInt(req.query.num) || 100;
    const mockPets = mocksService.generateMockPets(petsCount);
    res.send({ status: 'success', payload: mockPets });
};

const generateAndSaveData = async (req, res) => {
    const { users, pets } = req.body;
    try {
        const { savedUsers, savedPets } = await mocksService.saveMockData(users, pets);
        res.send({ status: 'success', message: 'Data generated successfully', users: savedUsers, pets: savedPets });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ status: 'error', error: 'Failed to generate data' });
    }
};

export default {
    getMockUsers,
    getMockPets,
    generateAndSaveData,
};