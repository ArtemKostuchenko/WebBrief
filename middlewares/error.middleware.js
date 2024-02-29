
const errorMiddleware = (err, req, res, next) => {
    const error = {
        statusCode: err.statusCode || 500,
        msg: err.message || 'Something went wrong, please try again later',
    }

    return res.status(error.statusCode).json({ msg: error.msg });
}

module.exports = errorMiddleware;