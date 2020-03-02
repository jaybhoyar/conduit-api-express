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
exports.profileFormat = (profile, userid = false) => {
	if (profile.followers.includes(userid)) {
		following = true;
	} else {
		following = false;
	}
	let ProfileFormat = {
		profile: {
			username: profile.username,
			bio: profile.bio,
			image: profile.image,
			following: following
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
exports.singleArticleFormat = (article, userid = false) => {
	if (article.favoritedBy.includes(userid)) {
		favorited = true;
	} else {
		favorited = false;
	}
	return (article = {
		slug: article.slug,
		title: article.title,
		description: article.description,
		body: article.body,
		tagList: article.tagList,
		createdAt: article.createdAt,
		updatedAt: article.updatedAt,
		favorited: favorited,
		favoritesCount: article.favoritedBy.length,
		author: {
			username: article.author.username,
			bio: article.author.bio,
			image: article.author.image,
			following: false
		}
	});
};
exports.singleCommentFormat = comment => {
	return (comment = {
		body: comment.body,
		createdAt: comment.createdAt,
		updatedAt: comment.createdAt,
		author: {
			username: comment.author.username,
			bio: comment.author.bio,
			image: comment.author.image,
			following: false
		}
	});
};
