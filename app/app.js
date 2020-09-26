const express = require("express");
const db = require("./db")();
const api_v1 = require("./routers/v1/api")

const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json())

const PORT = process.env.PORT || 8080;

app.use("/api/v1/", api_v1);

app.listen(PORT, () =>
    console.log(`Server is working on ${PORT}.`)
);
