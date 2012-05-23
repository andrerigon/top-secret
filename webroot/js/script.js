 $(document).ready(function() {
 	if( $('#message').text() != '' ){
 		alert($('#message').text());
 	}

	$(".image").click(function(){
		$(".image").removeClass("selected");
		$(".image").addClass("not-selected");
		$(this).addClass("selected");
		$(this).removeClass("not-selected");
		$('#captcha').modal();
		$('#recaptcha_response_field').focus();
	});	


	$("#voting").submit(function(){
		if( $('.selected').length==0 ){
			alert("Selecione um participante");
			return false;
		}
		$('#vote').val( $('.selected').hasClass('first') ? 1 : 2 );
		return true;
	});
 });

