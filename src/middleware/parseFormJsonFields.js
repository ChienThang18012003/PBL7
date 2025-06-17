// middlewares/parseFormJsonFields.js

module.exports = function parseFormJsonFields(fieldsToParse = []) {
    return (req, res, next) => {
      fieldsToParse.forEach((field) => {
        if (req.body[field] && typeof req.body[field] === 'string') {
          try {
            req.body[field] = JSON.parse(req.body[field]);
          } catch (err) {
            console.warn(`Failed to parse field '${field}':`, err.message);
          }
        }
      });
      next();
    };
  };
  