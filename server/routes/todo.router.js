const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "todo"`
})
// POST

// PUT

// DELETE

module.exports = router;
