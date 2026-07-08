import Settings from "../models/Settings.js";

// ======================================
// Get Store Settings
// ======================================

export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    // Create default settings if none exist
    if (!settings) {
      settings = await Settings.create({});
    }

    res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Update Store Settings
// ======================================

export const updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    // Create default settings if none exist
    if (!settings) {
      settings = await Settings.create({});
    }

    const {
      storeName,
      storeEmail,
      phone,

      freeShipping,
      shippingFee,
      taxRate,

      notifications,
    } = req.body;

    settings.storeName = storeName;
    settings.storeEmail = storeEmail;
    settings.phone = phone;

    settings.freeShipping = freeShipping;
    settings.shippingFee = shippingFee;
    settings.taxRate = taxRate;

    if (notifications) {
      settings.notifications = {
        ...settings.notifications.toObject(),
        ...notifications,
      };
    }

    await settings.save();

    res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
