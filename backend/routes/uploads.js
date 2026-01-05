
const express = require('express');
const { hazardMediaUpload } = require('../controllers/uploads');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.route('/:id/media').put(protect, hazardMediaUpload);

module.exports = router;
