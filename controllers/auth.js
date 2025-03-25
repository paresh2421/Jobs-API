const UserSchema = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const bcryptjs = require('bcryptjs');
const {BadRequestError, UnauthenticatedError} = require('../errors');

const register = async (req, res)=>{
    const user = await UserSchema.create({ ...req.body });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: {username: user.name}, token});
}

const login = async (req, res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        throw new BadRequestError('Email or password is required');
    }

    const user = await UserSchema.findOne({email});
    
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials');
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid Credentials');
    }
    
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user: user.name, token})
}

module.exports = {
    register, login
}