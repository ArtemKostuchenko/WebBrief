const UserModel = require('../models/user.model');
const { BadRequestError, UnAuthorizedError } = require('../errors');

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new BadRequestError('Please provide username and password');
    }

    const user = await UserModel.findOne({ username });

    if (!user) {
        throw new UnAuthorizedError('Invalid credentials');
    }

    const correctPassword = await user.comparePassword(password);

    if (!correctPassword) {
        throw new UnAuthorizedError('Invalid credentials');
    }

    const token = user.createToken();

    res.cookie('api_token', token, { httpOnly: true, secure: false });

    return res.status(200).json({ user: { id: user._id, username: user.username, isAdmin: user.isAdmin } });
}

const register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new BadRequestError('Please provide username and password');
    }

    const user = await UserModel.create({ ...req.body });

    const token = user.createToken();

    res.cookie('api_token', token, { httpOnly: true, secure: false });

    return res.status(200).json({ user: { id: user._id, username: user.username, isAdmin: user.isAdmin } });
}

const validate = async (req, res) => {
    const user = await UserModel.findById(req.user._id);

    if (!user) {
        if (req.cookies.api_token) {
            res.clearCookie('api_token');
        }

        throw new UnAuthorizedError('Invalid credentials');
    }

    return res.status(200).json({ user: { id: user._id, username: user.username, isAdmin: user.isAdmin } });
}

module.exports = { login, register, validate };