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

    res.cookie('_api_token', token, { httpOnly: true, secure: false });

    return res.status(200).json({ user: { id: user._id, username: user.username } });
}

const register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new BadRequestError('Please provide username and password');
    }

    const user = await UserModel.create({ ...req.body });

    const token = user.createToken();

    res.cookie('_api_token', token, { httpOnly: true, secure: false });

    return res.status(200).json({ user: { id: user._id, username: user.username } });
}

module.exports = { login, register };