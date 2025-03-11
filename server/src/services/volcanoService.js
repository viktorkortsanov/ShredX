import Volcano from "../models/post.js";

const volcanoService = {

    getAll(filter = {}) {
        const query = Volcano.find();

        if (filter.name) {
            query.find({ name: { $regex: filter.name, $options: 'i' } });
        }

        if (filter.typeVolcano) {
            query.find({ typeVolcano: filter.typeVolcano });
        }

        return query;
    },
    

    getOne(volcanoId) {
        return Volcano.findById(volcanoId);
    },

    create(volcanoData, userId) {
        return Volcano.create({ ...volcanoData, owner: userId });
    },

    delete(volcanoId) {
        return Volcano.findByIdAndDelete(volcanoId);
    },

    edit(volcanoId, volcanoData) {
        return Volcano.findByIdAndUpdate(volcanoId, volcanoData, { runValidators: true });
    },

    vote(volcanoId, userId) {
        return Volcano.findByIdAndUpdate(volcanoId, { $push: { voteList: userId } });
    }
};

export default volcanoService;