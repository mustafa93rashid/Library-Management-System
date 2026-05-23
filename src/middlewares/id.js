const { default: mongoose } = require("mongoose");

const id = (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json("Invalid ID format");
    }           
    next();
}

module.exports = id;