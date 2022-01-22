const express = require('express');

const app = express();

app.use('/motivation',(req, res, next)=> {
    console.log('First log');
    res.send('<p>I am on it and will become a star in this skill</p>');
});

app.use('/',(req, res, next)=> {
    console.log('Second log');
    res.send('<p>Hello from Will</p>');
});

app.listen(3000);
