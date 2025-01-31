const dotenv = require("dotenv");
const express = require("express");

const app = express();
dotenv.config();

const port = process.env.PORT;

app.set("view engine", "hbs");

app.listen(port, () => {
    console.log(`Weather app (http://localhost:${port}) is listening on port ${port}`);
});