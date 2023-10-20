const express = require('express');
const app = express();
const router = require('./routes/task');
const PORT = process.env.PORT || 8000;
const Sequelize = require('sequelize');
const {Wallet} = require('./models/wallet');
const {Transactions} = require('./models/transactions');
const cors = require('cors');
const sequelize = new Sequelize('Wallet-app', 'postgres', 'admin', {
  host: 'localhost', 
  dialect: 'postgres',
  port: 5432, 
  
});


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

//middleware


app.use(express.json());
app.use(cors());


//routes for the APIs
app.use('/', router);
app.use('/api/wallet', router);




//listening to server connection
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})




