module.exports = (req, res, next) => {
  const subCategoryId = req.params.id;


  req.filter = {
    isDeleted: false,
    isActive: true,
    subcategory: subCategoryId
  };

  next();
};