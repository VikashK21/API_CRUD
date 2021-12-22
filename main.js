// require('dotenv').config();
const express = require('express');
const app = express();
const port = 8000;
app.use(express.json())



const route = require('./controller/controller');

app.use('/', route);





app.get('/homePage', (req, res) => {
    res.send('This is the front page speaking..')
})






app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
})

