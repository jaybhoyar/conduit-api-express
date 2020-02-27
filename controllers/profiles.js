var auth = require("../modules/auth");
var User = require("../models/user");

exports.getUser = async (req, res, next) => {
	try {
		var username = req.params.username;
		var user = await User.findOne({ username });
		res.json({
			profile: {
				username: user.username,
				bio: user.bio,
				image: user.image
			}
		});
	} catch (error) {
		next(error);
	}
};
