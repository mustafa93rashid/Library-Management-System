const Material = require("../models/Material");

class MaterialsController {
  // get all materials
  getAll = async (req, res) => {
    const materials = await Material.find();

    res.status(200).json({
      message: "get all materials successfully",
      data: materials,
    });
  };

  // Get material by ID 
  getById = async (req, res) => {
    const id = req.params.id;

    const material = await Material.findById(id);
    
    res.status(200).json({
      message: `get material by id ${id} successfully`,
      data: material,
    });
  };

  // Create material
  add = async (req, res) => {
    const material = await Material.create(req.materialData);

    res.status(201).json({
      message: "Material created successfully",
      data: material,
    });
  };

  // Update material
  update = async (req, res) => {
    const id = req.params.id;

    const material = await Material.findByIdAndUpdate(id, req.materialData);
    const updatedFields = Object.keys(req.body);

    res.status(200).json({
      message: `${updatedFields.length} field(s) updated successfully`,
      updatedFields,
      data: material,
    });
  };

  // Delete material
  remove = async (req, res) => {
    const id = req.params.id;

    const material = await Material.findById(id);
    await Material.findByIdAndDelete(id);

    res.status(200).json({
    message: `${material.materialType} ${material.title} deleted successfully`,
    });
  };
}

module.exports = new MaterialsController();