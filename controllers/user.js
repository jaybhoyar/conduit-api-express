var auth = require("../modules/auth");
var User = require("../models/user");

exports.register = async (req, res, next) => {
	try {
		const user = await User.create(req.body);
		const token = await auth.generateJWT(user);
		var userInfo = {
			email: user.email,
			token,
			username: user.username,
			bio: user.bio,
			image: user.image
		};
		res.json({
			user: userInfo
		});
	} catch (error) {
		next(error);
	}
};
