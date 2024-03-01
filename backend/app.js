require('dotenv').config();
require('express-async-errors');
const express = require('express');
const handlebars = require('express-handlebars');
const cors = require('cors');
const errorMiddleware = require('./middlewares/error.middleware');
const connectToDb = require('./db/connection');

const authRouter = require('./routes/auth.route');
const briefRouter = require('./routes/brief.route');

const app = express();

app.engine('handlebars', handlebars.engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use(cors({
    origin: [process.env.CLIENT_URI]
}));
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/brief', briefRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectToDb(process.env.MONGO_URI);

        app.listen(PORT, console.log(`Server is listening on ${PORT}`));
    } catch (err) {
        console.log(err);
    }
}

startServer();