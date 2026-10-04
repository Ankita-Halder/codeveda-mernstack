const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
    try {
        console.log(req.body);

        res.status(200).send(
            "Welcome to world best mern series by thapa Codeveda using router"
        );

    } catch (error) {
        console.log(error);
    }
};
//register


const register = async (req, res, next) => {
    try {
        console.log(req.body);

        const { username, email, phone, password } = req.body;

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "email already exists"
            });
        }

        const userCreated = await User.create({
            username,
            email,
            phone,
            password
        });

        res.status(201).json({
            msg: "registration successful",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        });

    } catch (error) {
        console.log("REGISTER ERROR:", error);

        next(error);
    }
};


// USER LOGIN LOGIC
const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const userExist = await User.findOne({ email });

        console.log(userExist);

        if (!userExist) {
            return res.status(400).json({ message: "Invalid Credentials"
            });
        }
            //const user = await bcrypt.compare(password,userExist.password);
            const user = await userExist.comparePassword(password);

        if (user) {
            res.status(200).json({
                msg: "login successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        } else {
            res.status(401).json({
                message: "Invalid email or password"
            });
        }

    }catch(error) {

        console.log("LOGIN ERROR:", error);

        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};


// USER LOGIC- to send user data

const user = async (req,res) => {
    try{
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({ userData });
    }catch (error) {
        console.log('error from the user route ${error}');

    }
}


module.exports = {
    home,
    register,
    login,
    user
};