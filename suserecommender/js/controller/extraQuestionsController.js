var ExtraQuestionsController = function(model, view) {
	
	view.volgendeButton.click(function(){
		console.log("Questions done!");
		$('.list-group-question').each(function() {
			var qs = $(this).attr('id');
		
			var wantEmailElement = $(this).find(".wantEmail");
			var alreadyDoElement = $(this).find(".alreadyDo");
			var wantEmail = wantEmailElement.is(':checked');
			var alreadyDo = alreadyDoElement.is(':checked');
			console.log("Question: " + qs + " has box wantEmail: " + wantEmail + " and box alreadyDo: " + alreadyDo);
			model.setExtraQuestion(qs, wantEmail, alreadyDo);
		});
		model.extraQuestionsDone();
		
	});
 }