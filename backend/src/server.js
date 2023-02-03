const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const port = process.env.PORT || 8000;
const sequelize =  require('./models')
const api = require('./apicontroller')
const singleHome = require('./singleHome')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/homes', require('./routes/homeRoutes'));
app.use('/users', require('./routes/userRoutes'));
app.post('/api', async(req,res) => {
    console.log(req.body.zip)
    api.make_API_call(req.body.zip)
    .then(response => {
        res.json(response)    
    })
    .catch(error => {
        res.send(error)
    })
})

app.post('/singleHome', async(req,res) => {
    console.log(req.body.homeID)
    singleHome.make_API_call(req.body.homeID)
    .then(response => {
        res.json(response)    
    })
    .catch(error => {
        res.send(error)
    })
})
app.post('/eachHome', async(req,res) => {
    const homeID = req.body.homeID
    console.log(homeID)
    api.make_API_call_byID(homeID)
    .then(response => {
        res.json(response)    
    })
    .catch(error => {
        res.send(error)
    })
})
async function assertDatabaseConnectionOk() {
    console.log(`Checking database connection...`);
    try {
        await sequelize.authenticate();
        console.log("Database connection OK!");
    } catch (error) {
        console.log("Unable to connect to the database:");
        console.log(error.message);
        process.exit(1);
    }
}
async function init() {
    await assertDatabaseConnectionOk();

}

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname,'../../', 'frontend', 'build','index.html')
      )
    );
  }else {
    app.get('/', (req, res) => res.send('Please set to production'));
}

init();
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));