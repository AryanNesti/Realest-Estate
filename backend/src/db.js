const sequelize = require('./models');



async function reset() {
    console.log('Will rewrite the SQLite example database, adding some dummy data.');

    await sequelize.sync({ force: true });

    await sequelize.models.users.bulkCreate([
        { name: 'luffy', email: "luffym@gmail.com", password: "password" },
        { name: 'fire-fist', email: "firefistace@gmail.com", password: "pass" },
        { name: 'Tej', email: "test@gmail.com", password: "Password123"},
    ]);

    await sequelize.models.homes.bulkCreate([
        { email: 'luffym@gmail.com', homeID: "monkey"},
        { email: 'firefistace@gmail.com', homeID: "ace"},
        { email: 'test@gmail.com', homeID: "Patel" },
        { email: 'test@gmail.com', homeID: "monkey" },

    ]);


      console.log('Done!');
}

reset();
