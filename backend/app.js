require('dotenv').config();
require('express-async-errors');
const express = require('express');
const handlebars = require('express-handlebars');
const cors = require('cors');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const errorMiddleware = require('./middlewares/error.middleware');
const connectToDb = require('./db/connection');
require('./auth/passportJWT');

const authRouter = require('./routes/auth.route');
const briefRouter = require('./routes/brief.route');

const app = express();

app.engine('handlebars', handlebars.engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use(cookieParser());

app.use(cookieSession({
    name: 'auth',
    keys: [process.env.COOKIE_SECRET]
}));

app.use(cors({
    origin: process.env.CLIENT_URI || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
}));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/brief', briefRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

const startServer = async () => {
    try {
        await connectToDb(process.env.MONGO_URI);

        app.listen(PORT, HOST, console.log(`Server is listening on ${PORT}`));
    } catch (err) {
        console.log(err);
    }
}

startServer();