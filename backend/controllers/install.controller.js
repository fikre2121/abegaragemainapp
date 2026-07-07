import { installDatabase } from "../services/install.service.js";

// The function to install the database
export const install = async (req, res) => {
  try {
    const message = await installDatabase();

    res.status(200).json({
      success: true,
      message,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
