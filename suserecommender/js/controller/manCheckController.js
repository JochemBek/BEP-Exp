var ManCheckController = function(model, view) {
	
	view.volgendeButton.click(function(){
		var $expertqs = $("#expert");
    var $nonexpertqs = $("#nonexpert");
    
		if($expertqs.find("input:radio:checked").length == 5) { 
			console.log("Questions done!");
      
			$('#expert .list-group-item').each(function(order) {
        var expertise = 1;
				var qs = $(this).attr('id');
				var val = $(this).find('input:checked').val();
				console.log("Expert: Question: " + qs + " and value: " + val);
				model.setManCheckQuestion(expertise, qs, val, order+1);
			});
      
			model.manCheckQuestionsDone();
		} else if ($nonexpertqs.find("input:radio:checked").length == 5) {
			$('#nonexpert .list-group-item').each(function(order) {
        var expertise = 0;
				var qs = $(this).attr('id');
				var val = $(this).find('input:checked').val();
				console.log("Nonexpert: Question: " + qs + " and value: " + val);
				model.setManCheckQuestion(expertise, qs, val, order+1);
			});
      
			model.manCheckQuestionsDone();
		} else {
			alert(' U bent waarschijnlijk een vraag vergeten!');
		}
	});
 }