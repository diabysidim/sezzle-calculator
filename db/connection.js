
// connection set up;

module.exports = mongoose
  .connect("mongodb://localhost:27017/sezzleCalculator", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });
