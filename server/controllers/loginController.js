const { User } = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "$ecRet0_";

const register = async (req, res) => {
    let userData = req.body;
    try {
        let existUser = await User.exists({ email: userData.email });
        let nameAlreadyTaken = await User.exists({ name: userData.name });
        if (nameAlreadyTaken) {
            return res
                .status(500)
                .json({ errors: { name: "The name is already taken" } });
        }
        if (existUser) {
            // TODO: Cambiar el codigo de error :v
            return res.status(500).json({
                errors: {
                    email: "This email is already taken",
                },
            });
        }

        let hash = await new Promise((resolve, reject) => {
            bcrypt.hash(userData.password, 10, function (err, hash) {
                if (err) reject(err);
                resolve(hash);
            });
        });

        let user = new User({
            ...userData,
            password: hash,
        });
        await user.save();
        res.json({ user });
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            let errors = {};
            Object.keys(error.errors).map((key) => {
                errors[key] = error.errors[key].message;
            });

            res.status(400).json({ errors: errors });
        } else {
            res.status(500).json({ error: error.toString() });
        }
    }
};

const login = async (req, res) => {
    let data = req.body;
    try {
        let user = await User.findOne({ email: data.email });

        let samePassword = await bcrypt.compareSync(
            data.password,
            user.password
        );

        if (samePassword) {
            const payload = {
                id: user._id,
                name: user.name,
            };

            let token = jwt.sign(payload, JWT_SECRET, {
                expiresIn: "1000d",
            });

            let refreshToken = jwt.sign(payload, JWT_SECRET, {
                expiresIn: "1000d",
            });

            res.cookie("token", token, {
                httpOnly: true,
            });

            res.json({
                user: payload,
                token,
                refreshToken,
            });
        } else {
            res.status(400).json({ error: "Usuario y contraseña equivocados" });
        }
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
        } else {
            res.status(500).json({ error: error.toString() });
        }
    }
};

const refresh = (req, res) => {
    let data = req.body;

    if (!data.refreshToken) {
        return res.json({ error: "Refresh token no enviado" });
    }

    try {
        let payload = jwt.verify(data.refreshToken, JWT_SECRET);
        payload = {
            id: payload.id,
            name: payload.name,
        };
        let token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: "30s",
        });
        let refreshToken = jwt.sign(payload, JWT_SECRET, {
            expiresIn: "1000d",
        });

        res.json({
            token,
            refreshToken,
        });
    } catch (error) {
        return res.json({ error: error.toString() });
    }
};
const logout = async (req, res) => {
    //TODO Implementar logout mas tarde
    try {
        res.clearCookie("token");
        res.json({ message: "Cookie eliminada" });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
        res.json(error);
    }
};

module.exports = {
    register,
    login,
    refresh,
    logout,
};
