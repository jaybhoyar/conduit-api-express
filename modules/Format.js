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
			description: article.description,
			body: article.body,
			tagList: article.tagList
		}
	};
	return ArticleFormat;
};
exports.singleArticleFormat = article => {
	let singleArticleFormat = {
		article: {
			slug: article.slug,
			title: article.title,
			description: article.description,
			body: article.body,
			tagList: article.tagList,
			createdAt: article.createdAt,
			updatedAt: article.createdAt,
			favorited: false,
			favoritesCount: article.favoritesCount,
			author: {
				username: article.author.username,
				bio: article.author.bio,
				image: article.author.image,
				following: false
			}
		}
	};
	return singleArticleFormat;
};
