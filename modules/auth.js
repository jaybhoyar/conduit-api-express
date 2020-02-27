var jwt = require("jsonwebtoken");
require("dotenv").config();

exports.generateJWT = async (user, next) => {
	try {
		var payload = {
			userid: user.id,
			username: user.username
		};
		var token = await jwt.sign(payload, process.env.SECRET);
		return token;
	} catch (error) {
		next(error);
	}
};
exports.validateJWT = async (req, res, next) => {
	var token = req.headers["authorization"] || "";
	try {
		if (token) {
			var payload = await jwt.verify(token, process.env.SECRET);
			req.user = payload;
			req.user.token = token;
			next();
		} else {
			res.status(400).json({ error: "Invalid user Credentials" });
		}
	} catch (error) {
		next(error);
	}
};
