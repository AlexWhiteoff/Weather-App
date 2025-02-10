const dotenv = require("dotenv");
const express = require("express");
const hbs = require("hbs");
const path = require("path");
const routes = require("./routes");

const app = express();
dotenv.config();

const port = process.env.PORT;

app.set("view engine", "hbs");

hbs.registerPartials(path.join(__dirname + "/../views/partials"));

app.use(express.static(path.join(__dirname + "/../public")));

app.use(express.json());

app.use("/", routes);

app.listen(port, () => {
    console.log(`Weather app (http://localhost:${port}) is listening on port ${port}`);
});
