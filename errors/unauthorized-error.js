const CustomError = require('./custom-error');

class UnAuthorizedError extends CustomError{
    constructor(message){
        super(message);
        this.statusCode = 401;
    }
}

module.exports = UnAuthorizedError;