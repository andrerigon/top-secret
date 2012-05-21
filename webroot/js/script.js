 $(document).ready(function() {
	$(".image").click(function(){
		$(".image").removeClass("selected");
		$(".image").addClass("not-selected");
		$(this).addClass("selected");
		$(this).removeClass("not-selected");
	});	
 });