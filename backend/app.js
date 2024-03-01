require('dotenv').config();
require('express-async-errors');
const express = require('express');
const handlebars = require('express-handlebars');
const errorMiddleware = require('./middlewares/error.middleware');
const connectToDb = require('./db/connection');

const authRouter = require('./routes/auth.route');
const mainRouter = require('./routes/pages.route');

const app = express();

app.engine('handlebars', handlebars.engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/', mainRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

const startServer = async() => {
    try{
        await connectToDb(process.env.MONGO_URI);

        app.listen(PORT, console.log(`Server is listening on ${PORT}`));
    }catch(err){
        console.log(err);
    }
}

startServer();