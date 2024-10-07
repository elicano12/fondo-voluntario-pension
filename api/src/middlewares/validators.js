const validateRequest = (schema) => {
  return (req, res, next) => {
    const properties = Object.keys(schema);
    for (const property of properties) {
      const { error, value } = schema[property].validate(req[property], {
        abortEarly: true,
      });

      req[property] = value;

      if (error) {
        const validationErrors = error.details.map((detail) => detail.message);
        return res.status(400).json({
          message: 'Some attributes are required',
          errors: validationErrors,
        });
      }
    }

    next();
  };
};

module.exports = validateRequest;