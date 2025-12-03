
module.exports = (model) => async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const skip = (page - 1) * limit;
    const sortBy = req.query.sort || "createdAt";
    const order = req.query.order === "desc" ? -1 : 1;

    const filter = req.filter || {}; 

    const [results, total] = await Promise.all([
      model.find(filter).sort({ [sortBy]: order }).skip(skip).limit(limit),
      model.countDocuments(filter)
    ]);

    res.paginatedResult = {
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalResult: total,
      results,
    };
    next();
  } catch (err) {
    next(err);
  }
};
