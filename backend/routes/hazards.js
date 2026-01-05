
const express = require('express');
const {
  getHazards,
  getHazard,
  createHazard,
  updateHazard,
  deleteHazard,
} = require('../controllers/hazards');

const router = express.Router();

router.route('/').get(getHazards).post(createHazard);

router.route('/:id').get(getHazard).put(updateHazard).delete(deleteHazard);

module.exports = router;
