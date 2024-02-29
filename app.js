require('dotenv').config();
require('express-async-errors');
const express = require('express');
const errorMiddleware = require('./middlewares/error.middleware');

const authRouter = require('./routes/auth.route');

const app = express();

app.use(express.json());

app.use('/api/v1/auth', authRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is listening on ${PORT}`));