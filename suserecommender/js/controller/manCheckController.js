var ManCheckController = function(model, view) {
	
	view.volgendeButton.click(function(){
		var g = model.getAdvMan();
		
		if(g == 1) {
			$qs = $('#a1');
			$q = $('#a1 .list-group-item');
		} else if (g == 2) {
			$qs = $("#a2");
			$q = $('#a2 .list-group-item');
		} else if (g == 3) {
			$qs = $("#a3");
			$q = $('#a3 .list-group-item');
		} else if (g == 4) {
			$qs = $("#a4");
			$q = $('#a4 .list-group-item');
		}
    
		console.log("Ingevuld: " + $qs.find("input:radio:checked").length);
		
		if($qs.find("input:radio:checked").length == 5) {
			$q.each(function(order) {
        var advs = g;
				var qs = $(this).attr('id');
				var val = $(this).find('input:checked').val();
				model.setManCheckQuestion(advs, qs, val, order+1);
			});
			model.manCheckQuestionsDone();
		} else {
			alert(' U bent waarschijnlijk een vraag vergeten!');
		}
	});
	
 }