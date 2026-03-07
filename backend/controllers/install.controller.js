
// the function to instal

const { installDatabase } = require("../services/install.service");

const install = async (req, res) => {
  try {
    const message = await installDatabase();
    res.status(200).json({ success: true, message });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { install };