import {dirname} from "path";
import {fileURLToPath} from "url";
import User from "../models/User.js";
import * as path from "path";

export const updateUser = async (req, res) => {
    try {
        const {username} = req.body;

        if (username.length > 25) {
            return res.json({message: 'Error: Title length is more than 25 characters...'})
        }

        const user = await User.findById(req.userId);

        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))
            user.avatar = fileName || '';
        }

        user.username = username;

        await user.save();

        return res.json({user, message: 'User was updated successfully!'})
    } catch (e) {
        if(e.code === 11000) {
            res.json({message: 'Error: User with the same name already exists.'})
        } else {
            res.json({message: 'Error: Something went wrong...'})
        }
    }
}

export const updateScore = async (req, res) => {
    try {
        const newScore = req.body.score;

        const user = await User.findById(req.userId);
        if(user.score < newScore) {
            user.score = newScore;
        }

        await user.save();

        return res.json({user})
    } catch (e) {
        res.json({message: 'Error: Something went wrong...'})
    }
}