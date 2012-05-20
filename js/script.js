 $(document).ready(function() {
	$(".image").click(function(){
		$('.selected').hide();
		$(this).children('.selected').show();
	});	
 });