var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var v1Router = require("./routes/v1/index.js");
var profilesRouter = require("./routes/v1/profiles.js");
var articlesRouter = require("./routes/v1/articles");
require("dotenv").config();

mongoose.connect(
	process.env.DBURL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	},
	(err) => {
		console.log(err ? err : "Connected...");
	}
);
var app = express();
mongoose.set("useCreateIndex", true);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/v1/profiles", profilesRouter);
app.use("/api/v1/articles", articlesRouter);
app.use("/api/v1", v1Router);

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};
	if (err.name === "ValidationError") {
		res.status(400).json({ error: err.message });
	}
	// render the error page
	res.status(err.status || 500);
	res.json(err.message || "error");
});

module.exports = app;
