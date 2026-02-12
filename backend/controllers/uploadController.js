import { cloudinary } from '../config/cloudinary.js';

// @desc    Upload image to Cloudinary
// @route   POST /api/upload
// @access  Private (Admin only)
export const uploadImage = async (req, res) => {
  try {
    if (!req.body.image) {
      return res.status(400).json({ 
        success: false, 
        message: 'No image data provided' 
      });
    }
    
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.body.image, {
      folder: 'comfy-yarns',
      resource_type: 'auto'
    });
    
    res.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete image from Cloudinary
// @route   DELETE /api/upload/:publicId
// @access  Private (Admin only)
export const deleteImage = async (req, res) => {
  try {
    const { publicId } = req.params;
    
    await cloudinary.uploader.destroy(publicId);
    
    res.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
