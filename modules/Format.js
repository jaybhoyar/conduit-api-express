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
exports.profileFormat = profile => {
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
exports.articleFormat = article => {
	let ArticleFormat = {
		article: {
			title: article.title,
			description: article.title,
			body: article.title,
			tagList: article.tagList
		}
	};
	return ArticleFormat;
};
