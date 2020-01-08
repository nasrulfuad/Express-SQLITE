/* Open detail modal*/
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

/* Open modal edit form */
$('a[href=#edit]').on('click', function(e) {
	const id = $(this).attr('data-id');
	$.ajax({
		url: `/users/${id}/show`,
		success: function({ data }) {
			$('#name').val(data.name);
			$('#email').val(data.email);
			$('#phone').val(data.phone_number);
			$('#form-edit').attr('data-id', data.id);
		},
		error: function(err) {
			console.log(err);
		}
	});
	$('#modal-edit').modal('show');
});

/* Submit form edit */
$('#form-edit').on('submit', function(e) {
	e.preventDefault();
	const data = $(this).serialize();
	const id = $(this).attr('data-id');

	$.ajax({
		url: `/users/${id}`,
		method: 'POST',
		data,
		success: res => {
			iziToast.success({
				title: 'OK',
				message: 'Successfully updated record!'
			});
			$('#modal-edit').modal('hide');
			setTimeout(() => (window.location.href = '/'), 1000);
		},
		error: err => console.log(err)
	});
});
