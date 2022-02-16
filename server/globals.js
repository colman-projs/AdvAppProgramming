const errorHandler = (res) => (err) => {
    console.error(err);
    res.status(500).send({ error: err.message });
};

module.exports = {
    errorHandler,
};
