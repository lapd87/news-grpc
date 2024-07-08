const Joi = require('joi');


const newsSchema = Joi.object({
    date: Joi.date().iso().required(),
    title: Joi.string().min(3).max(100).required(),
    shortDescription: Joi.string().min(3).max(255).required(),
    text: Joi.string().min(3).required()
});

const querySchema = Joi.object({
    sortBy: Joi.string().valid('date', 'title').allow("").optional(),
    sortOrder: Joi.when("sortBy", {
        is: Joi.string().min(1),
        then: Joi.valid('asc', 'desc').required(),
        otherwise: Joi.string().allow("").max(0).message(`"sortOrder" must be empty when "sortBy" is not defined`),
    }),
    filterBy: Joi.string().valid('date', 'title').allow("").optional(),
    filterValue: Joi.when("filterBy", {
        is: Joi.string().min(1),
        then: Joi.string().required(),
        otherwise: Joi.string().allow("").max(0).message(`"filterValue" must be empty when "filterBy" is not defined`),
    }),
});

const validator = (schema, data) => {
    return schema.validate(data);
};


module.exports = {validator, newsSchema, querySchema};
