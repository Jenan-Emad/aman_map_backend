const {validateHazard} = require("../validation");

const validate = (validator) => {
  return (req, res, next) => {
    const { error } = validateHazard(req.body);
    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }
    next();
  };
};
module.exports = validate;
