$('a[href=#show]').on('click', function(e) {
	const id = $(this).attr('data-id');
	$.ajax({
		url: `/users/${id}/show`,
		success: function({ data }) {
			$('#m-name').text(data.name);
			$('#m-email').text(data.email);
			$('#m-phone').text(data.phone_number);
		},
		error: function(err) {
			console.log(err);
		}
	});
	$('#modal-show').modal('show');
});
