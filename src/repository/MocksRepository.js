class MocksRepository {
    constructor(usersDao, petsDao) {
        this.usersDao = usersDao;
        this.petsDao = petsDao;
    }

    async saveUsers(users) {
        return Promise.all(users.map(user => this.usersDao.save(user)));
    }

    async savePets(pets) {
        return Promise.all(pets.map(pet => this.petsDao.save(pet)));
    }
}

export default MocksRepository;