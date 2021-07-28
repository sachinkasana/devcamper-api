const errorResponse = require('../util/error-response');
const asyncHandler = require('../middleware/async-error-handler');
const Bootcamp = require('../models/Bootcamp');

//@desc Get all bootcamps
//@route GET api/v1/bootcamps
// @access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    console.log(req.query)
    // let query= {...req.query}
    // const page = parseInt(req.query.page, 10) || 1;
    // const limit = parseInt(req.query.limit, 10) || 1;
    // const skip=(page-1)*limit;
    // query= query.skip(skip).limit(limit);

    // execute query

    const bootcamp = await Bootcamp.find().populate('courses');
    res.status(200).json({ success: true, count: bootcamp.length, data: bootcamp })
}
)

//@desc Get single bootcamp
//@route GET api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp)
        return next(new errorResponse(`Bootcamp not found with id ${req.params.id}`, 404))
    res.status(200).json({ success: true, data: bootcamp })
})

//@desc  create new bootcamp
//@route POST api/v1/bootcamps
// @access Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
    const bootCamp = await Bootcamp.create(req.body);
    res.status(201).json({ success: true, data: bootCamp })
})

//@desc  update bootcamp
//@route PUT api/v1/bootcamps/:id
// @access Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    const bootCamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if (!bootCamp)
        return next(new errorResponse(`Bootcamp not found with id ${req.params.id}`, 404))

    res.status(200).json({ success: true, data: bootCamp })

})

//@desc  delete bootcamp
//@route DELETE api/v1/bootcamps/:id
// @access Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootCamp = await Bootcamp.findById(req.params.id)
    if (!bootCamp)
        return next(new errorResponse(`Bootcamp not found with id ${req.params.id}`, 404))

    bootCamp.remove();

    res.status(200).json({ success: true, data: {} })
})