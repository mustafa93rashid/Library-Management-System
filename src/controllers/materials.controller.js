const Material = require("../models/Material");

class MaterialsController {
  getAll = async (req, res) => {
    const materials = await Material.find();

    res.status(200).json({
      data: materials,
    });
  };

  getById = async (req, res) => {
    const id = req.params.id;
    const material = await Material.findById(id);
    res.status(200).json({
      data: material,
    });
  };

  add = async (req, res) => {
    const material = await Material.create(req.materialData);
    res.status(201).json({
      message: "Material created successfully",
      data: material,
    });
  };

  update = async (req, res) => {
    const id = req.params.id;

    const material = await Material.findByIdAndUpdate(id, req.materialData);

    res.status(200).json({
      message: "Material updated successfully",
      data: material,
    });
  };

  remove = async (req, res) => {
    const id = req.params.id;
    await Material.findByIdAndDelete(id);
    res.status(200).json({
      message: "Material deleted successfully",
    });
  };
}

module.exports = new MaterialsController();