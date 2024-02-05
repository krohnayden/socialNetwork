const { Thought, User } = require('../models')

module.exports = {
    getThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .then((thoughtData) => res.json(thoughtData))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v',
            })
            .then((thoughtData) => {
                if (!thoughtData) {
                    return res.status(404).json({ message: 'No thought with this ID!' });
                };
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            })
    },

    addThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then((userData) => {
                if (!userData) {
                    return res
                        .status(404)
                        .json({ message: 'No user with this ID to create thought!' });
                }
                res.json({ message: 'Thought created successfully' });
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400)
            })
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body {
            new: true,
            runValidators: true,
        })
        .then((thoughtData) => {
            if(!thoughtData) {
               return res.status(404).json({ message: 'No thought found with this ID!'});
            }
            res.json(thoughtData)
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        })
    },
    
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id})
        .then((thoughtData) => {
            if(!thoughtData) {
                return res.status(404).json({ message: 'No thought with this ID!'});
            }

            return User.findOneAndUpdate(
                { thoughts: params.id },
                { $pull: { thoughts: params.id }}, 
                { new: true}
            );
        })
        .then((userData) => {
            if(!userData) {
                return res
                .status(404)
                .json({ message: 'No thought with this ID!'});
            }
            res.json({ message: 'Thought successfully deleted!'});
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        })
    },

    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body}},
            { new: true, runValidators: true}
        )
        .then((thoughtData) => {
            if(!thoughtData) {
                return res.status(404).json({ message: 'No thought with this id'});
            }
            res.json(thoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        })
    },
    
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId}}},
            { new: true}
        )
        .then((thoughtData) => res.json(thoughtData))
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        })
    }
}