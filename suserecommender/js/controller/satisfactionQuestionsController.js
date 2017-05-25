var SatisfactionQuestionsController = function(model, view) {
	
	view.volgendeButton.click(function(){
		if( $( '#setQuestions .radioContainer input:checked' ).length < model.getQualityQuestions().length ){
			alert( 'U bent waarschijnlijk een vraag vergeten!' );
		}
		else{
			console.log("Questions done!");
			$("#setQuestions .list-group-item").each(function(place){
				var questionId = $(this).attr('id');
				var val 	   = $(this).find('input:checked').val();
				model.setQualityQuestion ( questionId, val, (place+1) );
				console.log("Question: " + questionId + " and value: " + val + " and place in order: " + (place+1));
			}).promise().done(function(){
				model.qualityQuestionsDone();
			});;
		}
	});
 }