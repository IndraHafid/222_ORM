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

