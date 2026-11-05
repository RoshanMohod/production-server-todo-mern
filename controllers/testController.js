const testingController = (req,res) => {
    res.status(200).send("<h1>Welcom to todo APP server</h1>");
};

module.exports = { testingController };