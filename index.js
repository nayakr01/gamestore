let express = require('express');
let app = express();
var morgan = require('morgan');
var cors = require('cors');

const PORT = 3000;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// routes
app.use('/api/users',require('./routes/users'));
app.use('/api/games',require('./routes/games'));

app.listen(PORT, ()=>{
    console.log("El servidor está escuchando en el puerto: " + PORT);
});