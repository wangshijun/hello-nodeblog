$(document).ready(function () {

	// list page
	var ndCategory = $('#js-category');
	var ndAuthor = $('#js-author');

	$('#js-filter-submit').on('click', function () {
		var query = queryString.parse(location.search);
		var category = ndCategory.val();
		var author = ndAuthor.val();

		if (category) {
			query.category = category
		} else {
			delete query.category;
		}

		if (author) {
			query.author = author
		} else {
			delete query.author;
		}

		console.log(queryString.stringify(query));
		window.location.url = window.location.origin + window.location.pathname + queryString.stringify(query);

	});

	// add page
	CKEDITOR.replace('js-post-content');
});
