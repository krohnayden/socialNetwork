const { User, Thought} = require('../models');

module.exports = {

    getUsers(req, res) {
        User.find({})
        .populate({
            path: 'friends',
            select: '-__v',
        })
        .then((userData) => res.json(userData))
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    getSingleUser({params}, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'friends',
            select: '-__v',
        })
        .then((userData) => {
            if(!userData) {
                return res
                .status(404)
                .json({ message: 'No user with this ID!'});
            }
            res.json(userData);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        })
    },

    createUser({ body }, res) {
        User.create(body)
        .then((userData) => res.json(userData))
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        })
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id}, body, {
            new: true,
            runValidators: true,
        })
        .then((userData) => {
            if(!userData) {
               return res
               .status(404)
               .json({ message: 'No user with this ID!'});
            }
            res.json(userData);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        })
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id})
        .then((userData) => {
            if(!userData) {
                return res
                .status(404)
                .json({ message: 'No user with this ID!'});
            }
            return Thought.deleteMany({ _id: { $in: userData.thoughts}});
            return res.json({ message: 'User and associated thoughts deleted!'});
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        })
    },

    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId},
            { $addToSet: { friends: params.friendId}},
            { new: true, runValidators: true}
        )
        .then((userData) => {
            if(!userData) {
                return res
                .status(404)
                .json({ message: 'No user with this ID!'});
            }
            res.json(userData);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        })
    },

    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId}},
            { new: true }
        )
        .then((userData) => {
            if(!userData) {
                return res
                .status(400)
                .json({ message: 'No user with this id!'});
            }
            res.json(userData);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        })
    }
}