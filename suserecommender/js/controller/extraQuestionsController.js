var ExtraQuestionsController = function(model, view) {
	
	view.volgendeButton.click(function(){
		console.log("Questions done!");
		$('#extraQuestions .list-group-item').each(function() {
			var qs = $(this).attr('id');
			var order = $("#extraQuestions .list-group-item").index(this)+1;
			console.log("Order is: " + order);
		
			var wantEmailElement = $(this).find(".wantEmail");
			var alreadyDoElement = $(this).find(".alreadyDo");
			var wantEmail = wantEmailElement.is(':checked');
			var alreadyDo = alreadyDoElement.is(':checked');
			console.log("Question: " + qs + " has box wantEmail: " + wantEmail + " and box alreadyDo: " + alreadyDo);
			model.setExtraQuestion(qs, order, wantEmail, alreadyDo);
		});
		model.extraQuestionsDone();
		
	});
 }