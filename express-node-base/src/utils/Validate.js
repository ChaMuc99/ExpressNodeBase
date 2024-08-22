const Joi = require('joi');

function isValidClass(data) {
    return Joi.object().keys({
        tenlop: Joi.string().trim().required(),
        manganh: Joi.string().trim().optional(),
        makhoahoc: Joi.string().trim().required(),

    }).validate(data);
}

module.exports = {
    isValidClass,
};
