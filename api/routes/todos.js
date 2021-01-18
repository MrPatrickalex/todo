const express = require('express');
const router = express.Router();

module.exports = (TodoService, logger) => {
    router.get('/', async (req, res) => {
        try {
            const todos = await TodoService.getTodos();
            res.status(200).json(todos);
        } catch (error) {
            logger.error(error);
            res.status(500).end();
        }
    })

    router.post('/', async (req, res) => {
        try {
            const todo = await TodoService.addTodo(
                req.body.id,
                req.body.todo,
                req.body.tags,
                req.body.time,
                req.body.completed,
                req.body.progress
            )
            logger.info(`todo created: ${todo}`)
            res.status(200).json(todo)
        } catch (error) {
            logger.error(error)
            res.status(500).end();
        }
    });

    router.delete('/:id', async (req, res) => {
        try {
            const todo = await TodoService.removeTodo(req.params.id);
            res.status(200).json(todo);
        } catch (error) {
            logger.error(error)
            res.status(500).end();
        }
    });


    router.put('/:id', async (req, res) => {
        try {
            const todo = await TodoService.updatedTodo(
                req.params.id,
                req.body.newTodo,
                req.body.newTags
            )
            res.status(200).json({ todo });
        } catch (error) {
            logger.error(error);
            res.status(500).end();
        }
    });

    router.put('/completed/:id/:completed', async (req, res) => {
        try {
            const todo = await TodoService.completeTodo(
                req.params.id,
                req.params.completed
            )
            res.status(200).json({ todo });
        } catch (error) {
            logger.error(error);
            res.status(500).end();
        }
    });

    router.put('/progress/:id/:progress', async (req, res) => {
        try {
            const todo = await TodoService.setProgressForTodo(
                req.params.id,
                req.params.progress
            )
            res.status(200).json(todo);
        } catch (error) {
            logger.error(error);
            res.status(500).end();
        }
    });

    router.put('/time/:id/:time', async (req, res) => {
        try {
            const todo = await TodoService.setTimeForTodo(
                req.params.id,
                req.params.time
            )
            res.status(200).json({ todo });
        } catch (error) {
            logger.error(error);
            res.status(500).end();
        }
    });

    router.put('/tags/:id/:tagId', async (req, res) => {
        try {
            const todo = await TodoService.addTagForTodo(
                req.params.id,
                req.params.tagId
            );
            res.status(200).json(todo);
        } catch (error) {
            logger.error(error);
            res.status(500).end();
        }
    });

    router.delete('/tags/:id/:tagId', async (req, res) => {
        try {
            const todo = await TodoService.removeTagForTodo(
                req.params.id,
                req.params.tagId
            );
            res.status(200).json({ todo });
        } catch (error) {
            logger.error(error);
            res.status(500).end();
        }
    });

    return router;
};