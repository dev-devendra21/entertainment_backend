import ApiError from "../utils/ApiError.js";

const validateBody = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const details = result.error.issues.reduce((errors, issue) => {
      const field = issue.path.join(".") || "body";
      if (!errors[field]) {
        errors[field] = issue.message;
      }
      return errors;
    }, {});

    return res
      .status(400)
      .json(new ApiError(false, "Validation Error", details));
  }

  req.body = result.data;
  return next();
};

export default validateBody;
