import User from "../models/User.js";

export const getLeaderboard = async (req, res) => {
    try {
        const users = await User.find().limit(10).sort('-score');
        if (!users) {
            return res.json({message: "No users yet", users: []})
        }

        return res.json({users})
    } catch (e) {
        res.json({message: 'Error: Something went wrong...'})
    }
}