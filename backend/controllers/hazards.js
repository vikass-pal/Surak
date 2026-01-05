const Hazard = require('../models/Hazard');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc      Get all hazards
// @route     GET /api/v1/hazards
// @access    Public
exports.getHazards = asyncHandler(async (req, res, next) => {
  const hazards = await Hazard.find();

  res.status(200).json({
    success: true,
    count: hazards.length,
    data: hazards,
  });
});

// @desc      Get single hazard
// @route     GET /api/v1/hazards/:id
// @access    Public
exports.getHazard = asyncHandler(async (req, res, next) => {
  const hazard = await Hazard.findById(req.params.id);

  if (!hazard) {
    return next(
      new ErrorResponse(`Hazard not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: hazard,
  });
});

// @desc      Create new hazard
// @route     POST /api/v1/hazards
// @access    Public
exports.createHazard = asyncHandler(async (req, res, next) => {
  // Handle file uploads if present
  let mediaPaths = [];
  if (req.files && req.files.files) {
    const path = require('path');
    const files = Array.isArray(req.files.files) ? req.files.files : [req.files.files];

    for (const file of files) {
      // Make sure the file is a photo or video
      if (!file.mimetype.startsWith('image') && !file.mimetype.startsWith('video')) {
        return next(new ErrorResponse(`Please upload an image or video file`, 400));
      }

      // Check filesize
      if (file.size > process.env.MAX_FILE_UPLOAD) {
        return next(
          new ErrorResponse(
            `Please upload an image or video less than ${process.env.MAX_FILE_UPLOAD}`,
            400
          )
        );
      }

      // Create custom filename
      const fileName = `media_${Date.now()}_${Math.random().toString(36).substr(2, 9)}${path.parse(file.name).ext}`;
      const uploadPath = `${process.env.FILE_UPLOAD_PATH}/${fileName}`;

      await file.mv(uploadPath);
      mediaPaths.push(fileName);
    }
  }

  // Prepare hazard data
  const hazardData = {
    ...req.body,
    media: mediaPaths,
  };

  // If not anonymous, associate with user if logged in
  if (!hazardData.isAnonymous && req.user) {
    hazardData.user = req.user._id;
  }

  const hazard = await Hazard.create(hazardData);

  res.status(201).json({
    success: true,
    data: hazard,
  });
});

// @desc      Update hazard
// @route     PUT /api/v1/hazards/:id
// @access    Private
exports.updateHazard = asyncHandler(async (req, res, next) => {
  const hazard = await Hazard.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!hazard) {
    return next(
      new ErrorResponse(`Hazard not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: hazard,
  });
});

// @desc      Delete hazard
// @route     DELETE /api/v1/hazards/:id
// @access    Private
exports.deleteHazard = asyncHandler(async (req, res, next) => {
  const hazard = await Hazard.findByIdAndDelete(req.params.id);

  if (!hazard) {
    return next(
      new ErrorResponse(`Hazard not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});
