const notFound = (req, res, next) => {
    return res.status(404).json("Not Found")
}   

module.exports = notFound;