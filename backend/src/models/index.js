const { Sequelize } = require('sequelize');


const sequelize = new Sequelize({    
  dialect: 'sqlite',    
  storage: './src/Database/database.sqlite',    
  logQueryParameters: true,    
  benchmark: true
});

const modelDefiners = [    
  require('./userModel'),   
  require('./homesModel'),   

  // Add more models here...    
  // require('./models/item'),
];


for (const modelDefiner of modelDefiners) {    
  modelDefiner(sequelize);
}

module.exports = sequelize;
