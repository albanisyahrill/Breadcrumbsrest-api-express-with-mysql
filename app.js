const express = require("express");
const bodyParser = require("body-parser");
const mahasiswaRoutes = require("./src/route/routes");
const app = express();
const port = process.env.port || 3000;

//Body parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.get("/", (req, res) => {
  res.send("Succesfully");
});

app.use("/mahasiswa", mahasiswaRoutes);

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
