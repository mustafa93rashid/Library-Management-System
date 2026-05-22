const prepareMaterialsData = (req, res, next) => {
  const {
    title,
    materialType,
    category,
    totalCopies,
    availableCopies,
    coverImage,
    author,
    publisher,
    publishedYear,
    isbn,
    issueNumber,
    month,
    year,
    duration,
    format,
    region,
    scale,
  } = req.body;

  const materialData = {
    title,
    materialType,
    category,
    totalCopies,
    availableCopies,
    coverImage,
  };

  if (materialType === "book") {
    materialData.book = {
      author,
      publisher,
      publishedYear,
      isbn,
    };
  }

  if (materialType === "magazine") {
    materialData.magazine = {
      issueNumber,
      month,
      year,
    };
  }

  if (materialType === "cd") {
    materialData.cd = {
      duration,
      format,
    };
  }

  if (materialType === "map") {
    materialData.map = {
      region,
      scale,
    };
  }

  req.materialData = materialData;

  next();
};

module.exports = prepareMaterialsData;