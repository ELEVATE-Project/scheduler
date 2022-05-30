const express = require('express');
//const { append } = require('vary');
const expressValidator = require('express-validator');
const router = express.Router();
router.use(expressValidator());
const { every, updateJob, jobList, now, once, cancel, deleteJob, scheduleJob } = require('../controllers/jobs');
const validate = require('../validator/jobs')


//API routes
router.get('/jobs/jobList', jobList);
router.post('/jobs/every', validate.everyAndOnce, every);
router.put('/jobs/:jobname', validate.deleteAndUpdate, updateJob);
router.post('/jobs/now', validate.nowAndCancel, now);
router.post('/jobs/once', validate.everyAndOnce, once);
router.post('/jobs/cancel', validate.nowAndCancel, cancel);
router.delete('/jobs/:jobname', validate.deleteAndUpdate, deleteJob);
router.post('/jobs/scheduleJob', validate.validation, scheduleJob);


module.exports=router;