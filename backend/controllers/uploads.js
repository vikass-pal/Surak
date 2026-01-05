
const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Hazard = require('../models/Hazard');

// @desc      Upload media for a hazard
// @route     PUT /api/v1/hazards/:id/media
// @access    Private
exports.hazardMediaUpload = asyncHandler(async (req, res, next) => {
  const hazard = await Hazard.findById(req.params.id);

  if (!hazard) {
    return next(
      new ErrorResponse(`Hazard not found with id of ${req.params.id}`, 404)
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const files = Array.isArray(req.files.files) ? req.files.files : [req.files.files];
  const mediaPaths = [];

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
    const fileName = `media_${hazard._id}_${Date.now()}${path.parse(file.name).ext}`;
    const uploadPath = `${process.env.FILE_UPLOAD_PATH}/${fileName}`;

    await file.mv(uploadPath);

    mediaPaths.push(fileName);
  }

  await Hazard.findByIdAndUpdate(req.params.id, { 
    $push: { media: { $each: mediaPaths } } 
  });

  res.status(200).json({
    success: true,
    data: mediaPaths,
  });
});
