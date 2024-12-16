class MocksRepository {
    constructor(usersDao, petsDao, adoptionsDao) {
        this.usersDao = usersDao;
        this.petsDao = petsDao;
        this.adoptionsDao = adoptionsDao; 
    }

    async saveUsers(users) {
        return Promise.all(users.map(user => this.usersDao.save(user)));
    }

    async savePets(pets) {
        return Promise.all(pets.map(pet => this.petsDao.save(pet)));
    }

    async saveAdoptions(adoptions) {
        return Promise.all(adoptions.map(adoption => this.adoptionsDao.save(adoption)));
    }
}

export default MocksRepository;