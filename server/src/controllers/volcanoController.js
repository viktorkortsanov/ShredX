import { Router } from "express";
import volcanoService from "../services/volcanoService.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const volcanoController = Router();

volcanoController.get('/volcanoes', async (req, res) => {
    const volcanoes = await volcanoService.getAll().lean();

    res.render('catalog', { title: 'Catalog Page', volcanoes });
});

function getVolcanoType({ typeVolcano }) {
    const volcanoTypes = ['Supervolcanoes', 'Submarine', 'Subglacial', 'Mud', 'Stratovolcanoes', 'Shield'];

    const viewData = volcanoTypes.map(type => ({
        value: type,
        label: type,
        selected: typeVolcano === type ? 'selected' : ''
    }));

    return viewData;
}

volcanoController.get('/volcanoes/:volcanoId/details', async (req, res) => {
    const volcano = await volcanoService.getOne(req.params.volcanoId).lean();
    const isOwner = volcano.owner.toString() == req.user?._id;
    const isVoted = volcano.voteList?.some(userId => userId.toString() === req.user?._id);
    const voteCount = volcano.voteList?.length || 0;
});

volcanoController.get('/volcanoes/:volcanoId/vote', isAuth, async (req, res) => {
    const volcanoId = req.params.volcanoId;
    const userId = req.user?._id;
    const isOwner = isVolcanoOwner(volcanoId, userId);

    if (isOwner) {
        return res.render('404');
    }

    try {
        await volcanoService.vote(volcanoId, userId);
    } catch (err) {

    }
});

volcanoController.get('/volcanoes/:volcanoId/delete', isAuth, async (req, res) => {

    if (isVolcanoOwner(req.params.volcanoId, req.user?._id)) {
        return res.render('404');
    }

    try {
        await volcanoService.delete(req.params.volcanoId);
        res.redirect('/volcanoes');
    } catch (err) {

    }
});

volcanoController.get('/volcanoes/:volcanoId/edit', isAuth, async (req, res) => {
    const volcano = await volcanoService.getOne(req.params.volcanoId).lean();
    const volcanoTypes = getVolcanoType(volcano);
    res.render('edit', { title: 'Edit Page', volcano, volcanoTypes });
    const isOwner = volcano.owner.toString() === req.user?._id;

    if (!isOwner) {
        return res.redirect('404');
    }
});

volcanoController.post('/volcanoes/:volcanoId/edit', isAuth, async (req, res) => {
    const volcanoData = req.body;
    const volcanoId = req.params.volcanoId;

    if (!isVolcanoOwner(volcanoId, req.user?._id)) {
        return res.redirect('404');
    }

    try {
        await volcanoService.edit(volcanoId, volcanoData);
        res.redirect(`/volcanoes/${volcanoId}/details`);
    } catch (err) {
        const volcanoTypes = getVolcanoType(volcanoData);
        const error = getErrorMessage(err);
        res.render('edit', { title: 'Edit Page', volcano: volcanoData, volcanoTypes, error });
    }
});


volcanoController.get('/create', isAuth, (req, res) => {

    const volcanoTypeData = getVolcanoType({});
    res.render('create', { title: 'Create Page', volcanoTypes: volcanoTypeData });
});

volcanoController.post('/create', isAuth, async (req, res) => {
    const volcanoData = req.body;
    const userId = req.user._id;

    try {
        await volcanoService.create(volcanoData, userId);
        res.redirect('/volcanoes');
    } catch (err) {
        const error = getErrorMessage(err);
        const volcanoTypeData = getVolcanoType(volcanoData);

        res.render('create', { title: 'Create Page', volcano: volcanoData, volcanoTypes: volcanoTypeData, error });
    }
});

volcanoController.get('/search', async (req, res) => {
    const query = req.query;
    console.log(query);

    const volcanoes = await volcanoService.getAll(query).lean();
    const volcanoTypes = getVolcanoType(query);

    res.render('search', { 
        title: 'Search', 
        volcanoes, 
        query, 
        volcanoTypes 
    });
});



async function isVolcanoOwner(volcanoId, userId) {
    const volcano = await volcanoService.getOne(volcanoId);
    const isOwner = volcano.owner.toString() === userId;

    return isOwner;
}

export default volcanoController;