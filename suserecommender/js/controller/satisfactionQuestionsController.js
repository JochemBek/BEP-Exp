var SatisfactionQuestionsController = function(model, view) {
	
	view.volgendeButton.click(function(){
		if( $( '#setQuestions .radioContainer input:checked' ).length < model.getSatisfactionQuestions().length ){
			alert( 'U bent waarschijnlijk een vraag vergeten!' );
		}
		else{
			$("#setQuestions .list-group-item").each(function(){
				var questionId = $(this).attr('id');
				var val 	   = $(this).find('input:checked').val();
				model.setUserSatisfactionQuestion ( questionId, val );
			}).promise().done(function(){
				model.satisfactionDone();
			});;
		}
	});
 }