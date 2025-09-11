const hazardService = require('../services/hazardService');

//  إضافة Hazard
exports.createHazard = async (req, res) => {
  try {
    const hazard = await hazardService.createHazard(req.body);
    res.status(201).json({ success: true, data: hazard });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// عرض كل الـ Hazards
exports.getHazards = async (req, res) => {
  try {
    const hazards = await hazardService.getHazards();
    res.json({ success: true, data: hazards });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// عرض Hazard واحد حسب ID
exports.getHazardById = async (req, res) => {
  try {
    const hazard = await hazardService.getHazardById(req.params.id);
    if (!hazard) return res.status(404).json({ success: false, message: "غير موجود" });
    res.json({ success: true, data: hazard });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//  تحديث Hazard
exports.updateHazard = async (req, res) => {
  try {
    const hazard = await hazardService.updateHazard(req.params.id, req.body);
    if (!hazard) return res.status(404).json({ success: false, message: "غير موجود" });
    res.json({ success: true, data: hazard });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

//  حذف Hazard
exports.deleteHazard = async (req, res) => {
  try {
    const hazard = await hazardService.deleteHazard(req.params.id);
    if (!hazard) return res.status(404).json({ success: false, message: "غير موجود" });
    res.json({ success: true, message: "تم الحذف" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
