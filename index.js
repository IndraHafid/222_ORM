const express = require('express');
const app = express();
const db = require('./models');
const PORT = 3001;
app.use(express.json());
app.use(express.urlencoded({
    extended: true  
}));

app.listen(PORT, () => {
    console.log('sever started on port 3001');
})

db.sequelize.sync()
    .then((result) => {
        app.listen(3000, () => {
            console.log('Server Started');
        })
    })
    .catch((err) => {
        console.log(err);
    })

