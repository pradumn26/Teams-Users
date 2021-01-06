const express = require('express');

const app = express();

if (process.env.NODE_ENV == 'production') {
    app.use(express.static('client/build'));
    const path = require('path');
    app.get('*', (req, res) => {
        console.log('here')
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('server started');
})