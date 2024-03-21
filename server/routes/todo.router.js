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

// PUT

// DELETE

module.exports = router;
