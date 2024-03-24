const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "todo";`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error in GET /todo', error);
        res.sendStatus(500);
    })
});
// POST
router.post('/', (req, res) => {
    const task = req.body;
    const queryText = `
    INSERT INTO "todo" ("task", "duedate") VALUES ($1, $2);
    `;
    pool.query(queryText, [task.task, task.duedate])
        .then((result) => {
            console.log('Added this task to the database:', task);
            res.sendStatus(201);
        }).catch((error) => {
            console.log('Error in POST', error);
            res.sendStatus(500);
        });
})

// PUT
router.put('/:id', (req, res) => {
    const task = req.params;
    console.log('req.params', req.params);
    let queryText = `
        UPDATE "todo" SET "task" = $2, "duedate" = $3
        WHERE "id" = $1;
        `;
    pool.query(queryText, [task.id, task.task, task.duedate])
        .then(() => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error in PUT /todo/:id:', error);
            res.sendStatus(500);
        })
        
})

// DELETE
router.delete('/:id', (req, res) => {
    console.log('req.params', req.params);
    let queryText = `DELETE FROM "todo" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id])
        .then(() => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error in DELETE /todo/:id:', error);
            res.sendStatus(500);
        })
})


module.exports = router;
