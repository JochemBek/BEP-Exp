var ManCheckController = function(model, view) {
	
	view.volgendeButton.click(function(){
		var $expertqs = $(".expert");
    var $nonexpertqs = $(".nonexpert");
    
		if($expertqs.find("input:radio:checked").length == $expertqs.length && $nonexpertqs.find("input:radio:checked").length == $nonexpertqs.length) { 
			console.log("Questions done!");
      
			$('.expert').each(function() {
        var expertise = 1;
				var qs = $(this).attr('id');
				var val = $(this).find('input:checked').val();
				console.log("Expert: Question: " + qs + " and value: " + val);
				model.setManCheckQuestion(expertise, qs, val);
			});
      
      $('.nonexpert').each(function() {
        var expertise = 0;
				var qs = $(this).attr('id');
				var val = $(this).find('input:checked').val();
				console.log("Nonexpert: Question: " + qs + " and value: " + val);
				model.setManCheckQuestion(expertise, qs, val);
			});
      
			model.manCheckQuestionsDone();
		} else {
			alert(' U bent waarschijnlijk een vraag vergeten!');
		}
	});
 }