/* Open modal add user */
$("#btn-add-user").on("click", function(e) {
	$("#modal-add-user").modal("show");
});

/* Open detail modal*/
$("a[href=#show]").on("click", function(e) {
	const id = $(this).attr("data-id");
	$.ajax({
		url: `/groups/${id}/show`,
		success: function({ data }) {
			let str = ``;
			data.users.forEach(user => (str += `<li class="list-group-item py-1">${user.name}</li>`));
			$("#members").html(str ? str : `<li class="list-group-item text-center py-1 text-danger">This Group doesn't have any users</li>`);
		},
		error: err => console.log(err)
	});
	$("#modal-show").modal("show");
});

/* Open modal edit form */
$("a[href=#edit]").on("click", function(e) {
	const id = $(this).attr("data-id");
	$.ajax({
		url: `/groups/${id}/show`,
		success: function({ data }) {
			$("#edit-name").val(data.name);
			$("#desc").val(data.description);
			$("#form-edit").attr("data-id", data.id);
			$.each($("#members option"), function() {
				const that = $(this);
				let a = false;
				data.users.forEach(user => {
					if (user.id === that.val()) {
						a = true;
						that.attr("selected", "selected");
					} else {
						if (!a) that.removeAttr("selected");
					}
				});
			});
		},
		error: function(err) {
			console.log(err);
		}
	});
	$("#modal-edit").modal("show");
});

/* Submit form edit */
$("#form-edit").on("submit", function(e) {
	e.preventDefault();
	const data = $(this).serialize();
	const id = $(this).attr("data-id");

	$.ajax({
		url: `/groups/${id}`,
		method: "POST",
		data,
		success: res => {
			iziToast.success({
				title: "OK",
				message: "Successfully updated record!"
			});
			$("#modal-edit").modal("hide");
			setTimeout(() => (window.location.href = "/groups"), 1000);
		},
		error: err => console.log(err)
	});
});

/* Submit form add user */
$("#form-add-user").on("submit", function(e) {
	e.preventDefault();
	const data = $(this).serialize();
	$.ajax({
		url: `/groups`,
		method: "POST",
		data,
		success: ({ status, message }) => {
			if (status) {
				iziToast.success({
					title: "OK",
					message
				});
				setTimeout(() => (window.location.href = "/groups"), 1000);
			}
		},
		error: err => console.log(err)
	});
});
