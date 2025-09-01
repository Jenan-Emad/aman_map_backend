const Hazard = require('../models/Hazard');

// إنشاء Hazard جديد
exports.createHazard = async (data) => {
  const hazard = new Hazard(data);
  return await hazard.save();
};

//  جلب جميع الـ hazards
exports.getHazards = async () => {
  return await Hazard.find().populate('relatedReports');
};

//  جلب hazard حسب ID
exports.getHazardById = async (id) => {
  return await Hazard.findById(id).populate('relatedReports');
};

//  تحديث hazard
exports.updateHazard = async (id, data) => {
  return await Hazard.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

//  حذف hazard
exports.deleteHazard = async (id) => {
  return await Hazard.findByIdAndDelete(id);
};
