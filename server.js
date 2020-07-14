const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();
// Configurations

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use(expressLayouts);
app.use(express.static("public"));
app.use("/", indexRouter);
app.use("/authors", authorRouter);

// Connect to database
mongoose.connect(
	process.env.DATABASE_URL,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => console.log("connected to database")
);
app.listen(process.env.PORT || 3003);
