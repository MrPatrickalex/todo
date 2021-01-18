const express = require('express');
const router = express.Router();

module.exports = (TodoService, logger) => {
    router.get('/', async (req, res) => {
        try {
            const tags = await TodoService.getTags();
            res.status(200).json(tags);
        } catch (error) {
            logger.error(error);
            res.status(500).end();
        }
    })

    router.post('/', async (req, res) => {
        try {
            const tag = await TodoService.addTag(
                req.body.id,
                req.body.tag,
                req.body.color
            );
            res.status(200).json({ tag })
        } catch (error) {
            logger.error(error);
            res.status(500).end();
        }
    });

    router.put('/:id', async (req, res) => {
        try {
            const tag = await TodoService.updateTag(
                req.params.id,
                req.body.newTag,
                req.body.newColor
            )
            res.status(200).json({ tag });
        } catch (error) {
            logger.error(error);
            res.status(500).end();
        }
    });

    router.delete('/:id', async (req, res) => {
        try {
            const tag = await TodoService.removeTag(req.params.id);
            res.status(200).json({ tag });
        } catch (error) {
            logger.error(error);
            res.status(500).end();
        }
    });

    return router;
};