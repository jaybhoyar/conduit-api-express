exports.userFormat = (user, token) => {
	let UserFormat = {
		user: {
			email: user.email,
			token: token,
			username: user.username,
			bio: user.bio,
			image: user.image
		}
	};
	return UserFormat;
};
exports.profileFormat = (profile, token) => {
	let ProfileFormat = {
		profile: {
			username: profile.username,
			bio: profile.bio,
			image: profile.image,
			following: profile.following
		}
	};
	return ProfileFormat;
};
