const errorHandler = (err, req, res, next) => {
    
    return res.status(500).json({
        message: err.message || "Internal Server Error",
        hello: "hello"
    });
}

module.exports = errorHandler;