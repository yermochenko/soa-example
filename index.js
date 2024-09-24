const express = require('express');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.use('/note', require('./app/note'));

app.listen(port, function() {
    console.log(`Server listening on port ${port}`);
});
