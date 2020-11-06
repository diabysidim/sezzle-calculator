const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Room = require("./Room");

// user schema
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: {
        type: String,
        unique: true,
        index: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }],
});

// virtual field for the rooms
userSchema.virtual("rooms", {
    ref: "Room",
    localField: "_id",
    foreignField: "owner",
});

// method on a user instance to generate a token

userSchema.methods.generateToken = async function () {
    try{
        const token = jwt.sign({
            id: this._id.toString()
        }, process.env.TOKEN_KEY, {
            expiresIn: "30 minutes",
        });
        this.tokens.push({
            token: token
        });
        return token;
    }
    catch(e){
        console.log(e);
        throw new Error("there was an issue generating the token")
    }
   
};

//verify token

userSchema.statics.verifyToken = async function (token) {
    try {
        const isVerified = jwt.verify(token, process.env.TOKEN_KEY);
        return isVerified;
    } catch (e) {
        console.log(e);
        throw new Error("the token is not valid");
    }
};

// static method to register
userSchema.statics.register = async (user) => {
    try {
        const newUser = await new User(user);
        await newUser.save();
        return newUser;
    } catch(err) {
        console.log("there is an error");
             throw new Error("username taken")
    }
};

// static method to handle login
userSchema.statics.login = async (username, password) => {
    const user = await User.findOne({
        userName:username
    });

    if (!user) throw new Error("the username or password is not valid");

    const isValidPass = await bcrypt.compare(password, user.password);

    if (isValidPass) return user;
    else throw new Error("The username or the password is not valid");
};

// pre save  middlewares



userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8);
    }

    next();
});

// to json method for the user

userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};
const User = mongoose.model("User", userSchema);
module.exports = User;