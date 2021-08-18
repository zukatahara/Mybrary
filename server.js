const env = require('dotenv');
env.config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const indexRoute = require('./routes/index');
// console.log(path.join(__dirname, '/views'));

const app = express();
const PORT = process.env.PORT || 1234
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

app.use(morgan('dev'))

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));



//Views
app.set('view engine', 'ejs')
app.set('views',path.join(__dirname, 'views'))
app.set('layout', 'layouts/layout')

app.use(expressLayout)
app.use(express.static('public'))
//MongoDB
const mongoose = require('mongoose');
mongoose.connect(process.env.mongoose_URL, { useNewUrlParser:true,useUnifiedTopology: true});
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', ()=> console.log(`Connected to Mongoose`))


//routes
app.get('*', indexRoute)