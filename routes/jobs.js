const { Router } = require('express');
const router = Router();

const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobs');

router.get('/', getAllJobs).post('/', createJob);
router.get('/:id', getJob).patch('/', updateJob).delete('/', deleteJob);

module.exports = router;
