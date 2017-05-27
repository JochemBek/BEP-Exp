var ExtraQuestionsController = function(model, view) {
	
	view.volgendeButton.click(function(){
		$('#extraQuestions .list-group-item').each(function() {
			var qs = $(this).attr('id');
			var order = $("#extraQuestions .list-group-item").index(this)+1;
		
			var wantEmailElement = $(this).find(".wantEmail");
			var alreadyDoElement = $(this).find(".alreadyDo");
			var wantEmail = wantEmailElement.is(':checked');
			var alreadyDo = alreadyDoElement.is(':checked');
			model.setExtraQuestion(qs, order, wantEmail, alreadyDo);
		});
		model.extraQuestionsDone();
		
	});
	
 }