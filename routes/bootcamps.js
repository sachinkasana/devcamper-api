
const express = require('express');
const { getBootcamp, getBootcamps, updateBootcamp, deleteBootcamp, createBootcamp } = require('../controllers/bootcamps')

const router = express.Router();

//Include other routes here for courses
const courseRoute = require('./courses');

//Reroute route for course
router.use('/:bootcampId/courses', courseRoute);

router.route('/').get(getBootcamps).post(createBootcamp);
router.route('/:id').get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp);

// router.get('/', (req, res) => {
//     res.status(200).json({ success: true, msg: 'show all bootcamps' })
// })

// router.get('/:id', (req, res) => {
//     res.status(200).json({ success: true, msg: `get bootcamp for ${req.params.id}` })
// })

// router.post('/', (req, res) => {
//     res.status(200).json({ success: true, msg: 'create new bootcamp' })
// })

// router.put('/:id', (req, res) => {
//     res.status(200).json({ success: true, msg: `update bootcamp for ${req.params.id}` })
// })

// router.delete('/:id', (req, res) => {
//     res.status(200).json({ success: true, msg: `delete bootcamp for ${req.params.id}` })
// })

module.exports = router
