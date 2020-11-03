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
    const token = jwt.sign({
        id: this._id.toString()
    }, "sezzleCalculatorToken", {
        expiresIn: "30 minutes",
    });
    this.tokens.push({
        token: token
    });
    return token;
};

//

userSchema.statics.verifyToken = async function (token) {
    try {
        const isVerified = jwt.verify(token, "sezzleCalculatorToken");
        return isVerified;
    } catch (e) {
        console.log(e);
        throw new Error("the token is not valid");
    }
};

userSchema.statics.register = async (user) => {
    try {
        const user = await new User(user);
        user.save();
        await user.generateToken();
        return user;
    } catch (err) {
        return err;
    }
};

userSchema.statics.login = async (username, password) => {
    const user = await User.findOne({
        username
    });

    if (!user) throw new Error("unable to User 1");

    const isValidPass = await bcrypt.compare(password, user.password);

    if (isValidPass) return user;
    else throw new Error("unable to User");
};

// pre save and pre remove middlewares

userSchema.pre("remove", async function (next) {
    try {
        await Room.deleteMany({
            owner: this._id
        });
        next();
    } catch (error) {
        console.log(error);
        throw new Error("the user cannot be deleted");
    }
});

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